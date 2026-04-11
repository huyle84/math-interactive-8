import json
import random

data = {}

def gen_expressions():
    qs = []
    # 20 MCQ - Đơn thức, đa thức, cộng trừ, hằng đẳng thức, phân thức
    for i in range(1, 6):
        qs.append({"type": "mcq", "q": f"Đơn thức ${i}x^2y^3$ có bậc là bao nhiêu?",
                   "options": ["5", "6", "3", "2"], "answer": "5"})
    for i in range(1, 6):
        qs.append({"type": "mcq", "q": f"Cho biểu thức $A = ({i}x + y)^2$. Khai triển của A là:",
                   "options": [f"${i**2}x^2 + {2*i}xy + y^2$", f"${i**2}x^2 + {i}xy + y^2$", f"${i**2}x^2 - {2*i}xy + y^2$", f"${i**2}x^2 + y^2$"],
                   "answer": f"${i**2}x^2 + {2*i}xy + y^2$"})
    for i in range(1, 6):
        qs.append({"type": "mcq", "q": f"Phân thức đại số $\\frac{{x + {i}}}{{x - {i}}}$ xác định khi nào?",
                   "options": [f"$x \\neq {i}$", f"$x \\neq -{i}$", f"$x \\neq 0$", f"$x > {i}$"], "answer": f"$x \\neq {i}$"})
    for i in range(1, 6):
        qs.append({"type": "mcq", "q": f"Kết quả của phép nhân $x(x - {i})$ là:",
                   "options": [f"$x^2 - {i}x$", f"$x^2 + {i}x$", f"$2x - {i}x$", f"$x^2 - {i}$"], "answer": f"$x^2 - {i}x$"})

    # 10 Fill - Phân tích nhân tử, giá trị biểu thức
    for i in range(1, 11):
        qs.append({"type": "fill", "q": f"Tìm bậc của đa thức $P = x^4y + {i}x^3y^3 - x^2y^2$.", "options": [], "answer": "6"})
        
    # 10 TF - Hằng đẳng thức
    for i in range(1, 11):
        is_true = random.choice([True, False])
        if is_true:
            qs.append({"type": "tf", "q": f"Khẳng định sau đúng hay sai? $(a+{i})(a-{i}) = a^2 - {i**2}$", "options": ["Đúng", "Sai"], "answer": "Đúng"})
        else:
            qs.append({"type": "tf", "q": f"Khẳng định sau đúng hay sai? $(a+{i})(a-{i}) = a^2 + {i**2}$", "options": ["Đúng", "Sai"], "answer": "Sai"})
            
    return qs[:40]

def gen_solids():
    qs = []
    # 20 MCQ - hình chóp, thể tích
    for i in range(2, 22):
        s = i
        h = i+1
        qs.append({"type": "mcq", "q": f"Thể tích hình chóp tứ giác đều có diện tích đáy $S = {s}cm^2$ và chiều cao $h = {h}cm$ là:",
                   "options": [f"{(s*h)/3:.1f}", f"{s*h}", f"{(s*h)/2:.1f}", f"{s+h}"], "answer": f"{(s*h)/3:.1f}"})
    # 10 Fill
    for i in range(1, 11):
        qs.append({"type": "fill", "q": f"Hình chóp tứ giác đều có đáy là hình gì? (Ví dụ: Một loại tứ giác rất đặc biệt, 5 chữ cái)", "options": [], "answer": "vuông"})
    # 10 TF
    for i in range(1, 11):
        qs.append({"type": "tf", "q": "Hình chóp tam giác đều có mặt đáy là tam giác đều và các mặt bên là tam giác cân bằng nhau.", "options": ["Đúng", "Sai"], "answer": "Đúng"})
    return qs[:40]

def gen_pythagoras():
    qs = []
    triples = [(3,4,5), (6,8,10), (5,12,13), (9,12,15), (8,15,17), (7,24,25), (10,24,26), (15,20,25), (12,16,20), (18,24,30), (14,48,50), (20,21,29), (16,30,34), (24,32,40), (21,28,35)]
    for i in range(15):
        t = random.choice(triples)
        qs.append({"type": "mcq", "q": f"Tam giác vuông có hai cạnh góc vuông là {t[0]}cm và {t[1]}cm. Cạnh huyền dài bao nhiêu?", "options": [f"{t[2]}cm", f"{t[2]+1}cm", f"{t[2]-1}cm", f"{t[2]+2}cm"], "answer": f"{t[2]}cm"})
    for i in range(13):
        t = random.choice(triples)
        qs.append({"type": "fill", "q": f"Một tam giác vuông có cạnh huyền là {t[2]} và một cạnh góc vuông là {t[0]}. Độ dài cạnh còn lại là bao nhiêu?", "options": [], "answer": str(t[1])})
    for i in range(12):
        t = triples[i % len(triples)]
        qs.append({"type": "tf", "q": f"Bộ ba số ({t[0]}, {t[1]}, {t[2]}) là độ dài ba cạnh của một tam giác vuông.", "options": ["Đúng", "Sai"], "answer": "Đúng"})
    return qs[:40]

def gen_quadrilaterals():
    qs = []
    # 20 MCQ
    for i in range(20):
        qs.append({"type": "mcq", "q": "Tứ giác có hai đường chéo bằng nhau và cắt nhau tại trung điểm của mỗi đường là hình gì?",
                   "options": ["Hình chữ nhật", "Hình bình hành", "Hình thoi", "Hình thang cân"], "answer": "Hình chữ nhật"})
    # 10 Fill
    for i in range(10):
        qs.append({"type": "fill", "q": "Tổng các góc trong một tứ giác bất kỳ bằng ... độ (điền số)?", "options": [], "answer": "360"})
    # 10 TF
    for i in range(10):
        qs.append({"type": "tf", "q": "Hình thang cân là hình thang có hai góc kề một đáy bằng nhau.", "options": ["Đúng", "Sai"], "answer": "Đúng"})
    return qs[:40]

def gen_statistics():
    qs = []
    # 20 MCQ
    for i in range(20):
        qs.append({"type": "mcq", "q": f"Trong đợt thống kê, để khảo sát số lượng học sinh nghỉ học từng tháng trong năm học, biểu đồ nào phù hợp nhất?",
                   "options": ["Biểu đồ cột", "Biểu đồ quạt tròn", "Biểu đồ tranh", "Biểu đồ đoạn thẳng"], "answer": "Biểu đồ đoạn thẳng"})
    # 10 Fill
    for i in range(10):
        qs.append({"type": "fill", "q": "Một biểu đồ quạt tròn chia làm 2 phần, tỉ lệ 60% và x%. Giá trị của x là bao nhiêu?", "options": [], "answer": "40"})
    # 10 TF
    for i in range(10):
        qs.append({"type": "tf", "q": "Dữ liệu thu được: Đỏ, Xanh, Vàng là dữ liệu định lượng (số liệu).", "options": ["Đúng", "Sai"], "answer": "Sai"})
    return qs[:40]

def gen_equations():
    qs = []
    for i in range(15):
        a = random.randint(2, 5)
        ans_x = random.randint(1, 5)
        c = a * ans_x
        qs.append({"type": "mcq", "q": f"Nghiệm phương trình ${a}x = {c}$ là:", "options": [f"{ans_x}", f"{ans_x+1}", f"{-ans_x}", f"{ans_x-1}"], "answer": f"{ans_x}"})
    for i in range(12):
        qs.append({"type": "fill", "q": f"Giải PT: $2x - 4 = 0$, $x$ = ?", "options": [], "answer": "2"})
    for i in range(13):
        qs.append({"type": "tf", "q": f"Phương trình $0x = 5$ có vô số nghiệm.", "options": ["Đúng", "Sai"], "answer": "Sai"})
    return qs[:40]

def gen_functions():
    qs = []
    for i in range(15):
        a = random.choice([2, 3])
        qs.append({"type": "mcq", "q": f"Hàm số $y = {a}x + 1$ đồng biến hay nghịch biến?", "options": ["Đồng biến", "Nghịch biến", "Hằng số", "Không xác định"], "answer": "Đồng biến"})
    for i in range(12):
        qs.append({"type": "fill", "q": f"Tung độ gốc của $y = 3x - 5$ là (chỉ điền số)?", "options": [], "answer": "-5"})
    for i in range(13):
        qs.append({"type": "tf", "q": f"Hàm số $y = -2x+1$ nghịch biến trên R.", "options": ["Đúng", "Sai"], "answer": "Đúng"})
    return qs[:40]

def gen_thales():
    qs = []
    for i in range(14):
        qs.append({"type": "mcq", "q": f"Tỉ số của hai đoạn thẳng AB=2, CD=3 là:", "options": ["2/3", "3/2", "1/2", "3/4"], "answer": "2/3"})
    for i in range(13):
        qs.append({"type": "fill", "q": f"Định lý Thales: Trong tam giác, 1 đường thẳng song song với 1 cạnh và cắt 2 cạnh kia thì nó định ra trên 2 cạnh đó những đoạn thẳng tương ứng tỉ ...?", "options": [], "answer": "lệ"})
    for i in range(13):
        qs.append({"type": "tf", "q": "Định lý Thales đảo dùng để chứng minh hai đường thẳng song song.", "options": ["Đúng", "Sai"], "answer": "Đúng"})
    return qs[:40]

def gen_similartriangles():
    qs = []
    for i in range(14):
        k = random.randint(2, 5)
        qs.append({"type": "mcq", "q": f"Tỉ số diện tích 2 tam giác đồng dạng với tỉ số k={k} là?", "options": [f"{k**2}", f"{k}", f"{k**3}", "1/k"], "answer": f"{k**2}"})
    for i in range(13):
        qs.append({"type": "fill", "q": "Hai tam giác đồng dạng với tỉ số k=2. Nếu chu vi tam giác nhỏ là 10, chu vi tam giác lớn là bao nhiêu?", "options": [], "answer": "20"})
    for i in range(13):
        qs.append({"type": "tf", "q": "Hai tam giác bằng nhau thì đồng dạng.", "options": ["Đúng", "Sai"], "answer": "Đúng"})
    return qs[:40]

def gen_probability():
    qs = []
    for i in range(14):
        qs.append({"type": "mcq", "q": f"Xác suất mặt ngửa khi tung đồng xu là:", "options": ["1/2", "1/6", "1", "0"], "answer": "1/2"})
    for i in range(13):
        qs.append({"type": "fill", "q": "Biến cố không thể xảy ra có xác suất bằng bao nhiêu?", "options": [], "answer": "0"})
    for i in range(13):
        qs.append({"type": "tf", "q": "Tung xúc xắc, biến cố 'ra số 7' là không thể.", "options": ["Đúng", "Sai"], "answer": "Đúng"})
    return qs[:40]

data["expressions"] = gen_expressions()
data["solids"] = gen_solids()
data["pythagoras"] = gen_pythagoras()
data["quadrilaterals"] = gen_quadrilaterals()
data["statistics"] = gen_statistics()

data["equations"] = gen_equations()
data["functions"] = gen_functions()
data["thales"] = gen_thales()
data["similartriangles"] = gen_similartriangles()
data["probability"] = gen_probability()

with open('public/data.js', 'w', encoding='utf-8') as f:
    f.write("const topicData = ")
    json.dump(data, f, ensure_ascii=False, indent=4)
    f.write(";\n")
    
print("Successfully generated questions for HK1 and HK2 in public/data.js")
