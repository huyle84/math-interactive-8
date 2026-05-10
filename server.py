import asyncio
import websockets
import json

players = {}
host_ws = None
questions = []
current_q_index = -1
game_active = False

async def handler(websocket):
    global host_ws, questions, current_q_index, game_active
    
    client_type = None

    try:
        async for message in websocket:
            data = json.loads(message)
            action = data.get('action')

            if action == 'hostJoin':
                host_ws = websocket
                client_type = 'host'
                print("Host connected")
                await host_ws.send(json.dumps({'type': 'hostStatus', 'msg': 'Connected as Host'}))
                await host_ws.send(json.dumps({'type': 'updatePlayers', 'players': {id(ws): p for ws, p in players.items()}}))

            elif action == 'hostCreateGame':
                questions = data.get('questions', [])
                current_q_index = -1
                game_active = False
                players.clear()
                print("Host created a game with questions:", len(questions))

            elif action == 'hostStartGame':
                game_active = True
                current_q_index = 0
                payload = json.dumps({
                    'type': 'newQuestion',
                    'index': current_q_index,
                    'q': questions[current_q_index]
                })
                for p_ws in players.keys():
                    await p_ws.send(payload)
                if host_ws:
                    await host_ws.send(payload)

            elif action == 'hostNextQuestion':
                current_q_index += 1
                if current_q_index >= len(questions):
                    game_active = False
                    result_players = {id(ws): p for ws, p in players.items()}
                    end_payload = json.dumps({'type': 'gameEnded', 'players': result_players})
                    for p_ws in players.keys():
                        await p_ws.send(end_payload)
                    if host_ws:
                        await host_ws.send(end_payload)
                else:
                    for p_ws in players.keys():
                        players[p_ws]['status'] = None
                    payload = json.dumps({
                        'type': 'newQuestion',
                        'index': current_q_index,
                        'q': questions[current_q_index]
                    })
                    for p_ws in players.keys():
                        await p_ws.send(payload)
                    if host_ws:
                        await host_ws.send(payload)
                        await host_ws.send(json.dumps({'type': 'playerAnswered', 'players': {id(ws): p for ws, p in players.items()}}))

            elif action == 'playerJoin':
                name = data.get('name', 'Anonymous')
                players[websocket] = {'name': name, 'score': 0, 'status': None}
                client_type = 'player'
                print("Player joined:", name)
                await websocket.send(json.dumps({'type': 'playerJoinedStatus', 'name': name}))
                if host_ws:
                    await host_ws.send(json.dumps({'type': 'updatePlayers', 'players': {id(ws): p for ws, p in players.items()}}))

            elif action == 'playerAnswer':
                if websocket in players:
                    is_correct = data.get('isCorrect', False)
                    players[websocket]['status'] = is_correct
                    if is_correct:
                        players[websocket]['score'] += 0.25
                    if host_ws:
                        await host_ws.send(json.dumps({'type': 'playerAnswered', 'players': {id(ws): p for ws, p in players.items()}}))

    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        if client_type == 'host':
            host_ws = None
            print("Host disconnected")
        elif client_type == 'player':
            if websocket in players:
                name = players[websocket]['name']
                del players[websocket]
                print("Player disconnected:", name)
                if host_ws:
                    await host_ws.send(json.dumps({'type': 'updatePlayers', 'players': {id(ws): p for ws, p in players.items()}}))

import os

async def main():
    port = int(os.environ.get("PORT", 8080))
    print(f"WebSocket Server starting on ws://0.0.0.0:{port}")
    async with websockets.serve(handler, "0.0.0.0", port):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
