/* ================= DỮ LIỆU TIẾNG ANH (EN_CURRICULUM) =================
   Chương trình tiếng Anh tiểu học (Mầm non + Lớp 1-5) bám sách của Bộ GD&ĐT
   (bộ Global Success — NXB Giáo dục Việt Nam). Mỗi lớp gồm nhiều unit
   (chủ đề); mỗi item = { en, vi, emoji }. Lớp 3-5 có thêm "phrases" (câu mẫu).
   js/english.js dùng dữ liệu này để tự sinh câu hỏi cho mỗi bài học.
====================================================================== */
window.EN_CURRICULUM = [
 {
  "grade": 0,
  "title": "Mầm non",
  "subtitle": "Làm quen tiếng Anh: con vật, màu sắc, số đếm, trái cây, gia đình...",
  "units": [
   {
    "title": "Chào hỏi (Greetings)",
    "topic": "greetings",
    "emoji": "👋",
    "items": [
     {
      "en": "hello",
      "vi": "xin chào",
      "emoji": "👋"
     },
     {
      "en": "hi",
      "vi": "chào",
      "emoji": "🙋"
     },
     {
      "en": "yes",
      "vi": "có",
      "emoji": "✅"
     },
     {
      "en": "no",
      "vi": "không",
      "emoji": "❌"
     },
     {
      "en": "please",
      "vi": "làm ơn",
      "emoji": "🥺"
     },
     {
      "en": "thanks",
      "vi": "cảm ơn",
      "emoji": "🙏"
     }
    ]
   },
   {
    "title": "Màu sắc (Colors)",
    "topic": "colors",
    "emoji": "🎨",
    "items": [
     {
      "en": "red",
      "vi": "đỏ",
      "emoji": "🔴"
     },
     {
      "en": "yellow",
      "vi": "vàng",
      "emoji": "🟡"
     },
     {
      "en": "blue",
      "vi": "xanh dương",
      "emoji": "🔵"
     },
     {
      "en": "green",
      "vi": "xanh lá",
      "emoji": "🟢"
     },
     {
      "en": "orange",
      "vi": "cam",
      "emoji": "🟠"
     },
     {
      "en": "pink",
      "vi": "hồng",
      "emoji": "🩷"
     },
     {
      "en": "purple",
      "vi": "tím",
      "emoji": "🟣"
     }
    ]
   },
   {
    "title": "Số đếm 1-5 (Numbers)",
    "topic": "numbers",
    "emoji": "🔢",
    "items": [
     {
      "en": "one",
      "vi": "một",
      "emoji": "1️⃣"
     },
     {
      "en": "two",
      "vi": "hai",
      "emoji": "2️⃣"
     },
     {
      "en": "three",
      "vi": "ba",
      "emoji": "3️⃣"
     },
     {
      "en": "four",
      "vi": "bốn",
      "emoji": "4️⃣"
     },
     {
      "en": "five",
      "vi": "năm",
      "emoji": "5️⃣"
     }
    ]
   },
   {
    "title": "Con vật (Animals)",
    "topic": "animals",
    "emoji": "🐶",
    "items": [
     {
      "en": "dog",
      "vi": "con chó",
      "emoji": "🐶"
     },
     {
      "en": "cat",
      "vi": "con mèo",
      "emoji": "🐱"
     },
     {
      "en": "fish",
      "vi": "con cá",
      "emoji": "🐟"
     },
     {
      "en": "bird",
      "vi": "con chim",
      "emoji": "🐦"
     },
     {
      "en": "duck",
      "vi": "con vịt",
      "emoji": "🦆"
     },
     {
      "en": "cow",
      "vi": "con bò",
      "emoji": "🐮"
     },
     {
      "en": "pig",
      "vi": "con lợn",
      "emoji": "🐷"
     }
    ]
   },
   {
    "title": "Trái cây (Fruits)",
    "topic": "fruits",
    "emoji": "🍎",
    "items": [
     {
      "en": "apple",
      "vi": "quả táo",
      "emoji": "🍎"
     },
     {
      "en": "banana",
      "vi": "quả chuối",
      "emoji": "🍌"
     },
     {
      "en": "grape",
      "vi": "quả nho",
      "emoji": "🍇"
     },
     {
      "en": "mango",
      "vi": "quả xoài",
      "emoji": "🥭"
     },
     {
      "en": "strawberry",
      "vi": "quả dâu",
      "emoji": "🍓"
     },
     {
      "en": "watermelon",
      "vi": "quả dưa hấu",
      "emoji": "🍉"
     }
    ]
   },
   {
    "title": "Bộ phận cơ thể (Body)",
    "topic": "body",
    "emoji": "🧒",
    "items": [
     {
      "en": "eye",
      "vi": "mắt",
      "emoji": "👁️"
     },
     {
      "en": "nose",
      "vi": "mũi",
      "emoji": "👃"
     },
     {
      "en": "ear",
      "vi": "tai",
      "emoji": "👂"
     },
     {
      "en": "mouth",
      "vi": "miệng",
      "emoji": "👄"
     },
     {
      "en": "hand",
      "vi": "tay",
      "emoji": "✋"
     },
     {
      "en": "foot",
      "vi": "chân",
      "emoji": "🦶"
     }
    ]
   },
   {
    "title": "Gia đình (Family)",
    "topic": "family",
    "emoji": "👪",
    "items": [
     {
      "en": "dad",
      "vi": "bố",
      "emoji": "👨"
     },
     {
      "en": "mom",
      "vi": "mẹ",
      "emoji": "👩"
     },
     {
      "en": "baby",
      "vi": "em bé",
      "emoji": "👶"
     },
     {
      "en": "brother",
      "vi": "anh trai",
      "emoji": "👦"
     },
     {
      "en": "sister",
      "vi": "chị gái",
      "emoji": "👧"
     },
     {
      "en": "grandpa",
      "vi": "ông",
      "emoji": "👴"
     },
     {
      "en": "grandma",
      "vi": "bà",
      "emoji": "👵"
     }
    ]
   },
   {
    "title": "Đồ chơi (Toys)",
    "topic": "toys",
    "emoji": "🧸",
    "items": [
     {
      "en": "ball",
      "vi": "quả bóng",
      "emoji": "⚽"
     },
     {
      "en": "teddy",
      "vi": "gấu bông",
      "emoji": "🧸"
     },
     {
      "en": "doll",
      "vi": "búp bê",
      "emoji": "🪆"
     },
     {
      "en": "car",
      "vi": "ô tô",
      "emoji": "🚗"
     },
     {
      "en": "kite",
      "vi": "diều",
      "emoji": "🪁"
     },
     {
      "en": "balloon",
      "vi": "bóng bay",
      "emoji": "🎈"
     },
     {
      "en": "blocks",
      "vi": "khối xếp hình",
      "emoji": "🧱"
     }
    ]
   }
  ]
 },
 {
  "grade": 1,
  "title": "Lớp 1",
  "subtitle": "Làm quen tiếng Anh qua chủ đề chào hỏi, màu sắc, số đếm và con vật",
  "units": [
   {
    "title": "Chào hỏi (Hello)",
    "topic": "greetings",
    "emoji": "👋",
    "items": [
     {
      "en": "hello",
      "vi": "xin chào",
      "emoji": "👋"
     },
     {
      "en": "hi",
      "vi": "chào",
      "emoji": "🙋"
     },
     {
      "en": "goodbye",
      "vi": "tạm biệt",
      "emoji": "👋"
     },
     {
      "en": "boy",
      "vi": "cậu bé",
      "emoji": "👦"
     },
     {
      "en": "girl",
      "vi": "cô bé",
      "emoji": "👧"
     },
     {
      "en": "teacher",
      "vi": "giáo viên",
      "emoji": "👩‍🏫"
     },
     {
      "en": "friend",
      "vi": "người bạn",
      "emoji": "🧑‍🤝‍🧑"
     }
    ]
   },
   {
    "title": "Đồ dùng học tập (School things)",
    "topic": "school_things",
    "emoji": "🎒",
    "items": [
     {
      "en": "book",
      "vi": "quyển sách",
      "emoji": "📖"
     },
     {
      "en": "pen",
      "vi": "bút mực",
      "emoji": "🖊️"
     },
     {
      "en": "pencil",
      "vi": "bút chì",
      "emoji": "✏️"
     },
     {
      "en": "ruler",
      "vi": "thước kẻ",
      "emoji": "📏"
     },
     {
      "en": "crayon",
      "vi": "bút sáp màu",
      "emoji": "🖍️"
     },
     {
      "en": "notebook",
      "vi": "quyển vở",
      "emoji": "📓"
     },
     {
      "en": "school bag",
      "vi": "cặp sách",
      "emoji": "🎒"
     },
     {
      "en": "chair",
      "vi": "cái ghế",
      "emoji": "🪑"
     },
     {
      "en": "rubber",
      "vi": "cục tẩy",
      "emoji": ""
     }
    ]
   },
   {
    "title": "Màu sắc (Colours)",
    "topic": "colours",
    "emoji": "🎨",
    "items": [
     {
      "en": "red",
      "vi": "màu đỏ",
      "emoji": "🔴"
     },
     {
      "en": "yellow",
      "vi": "màu vàng",
      "emoji": "🟡"
     },
     {
      "en": "blue",
      "vi": "màu xanh dương",
      "emoji": "🔵"
     },
     {
      "en": "green",
      "vi": "màu xanh lá",
      "emoji": "🟢"
     },
     {
      "en": "orange",
      "vi": "màu cam",
      "emoji": "🟠"
     },
     {
      "en": "purple",
      "vi": "màu tím",
      "emoji": "🟣"
     },
     {
      "en": "pink",
      "vi": "màu hồng",
      "emoji": "💗"
     },
     {
      "en": "brown",
      "vi": "màu nâu",
      "emoji": "🟤"
     },
     {
      "en": "black",
      "vi": "màu đen",
      "emoji": "⚫"
     },
     {
      "en": "white",
      "vi": "màu trắng",
      "emoji": "⚪"
     }
    ]
   },
   {
    "title": "Số đếm 1-10 (Numbers)",
    "topic": "numbers",
    "emoji": "🔢",
    "items": [
     {
      "en": "one",
      "vi": "số một",
      "emoji": "1️⃣"
     },
     {
      "en": "two",
      "vi": "số hai",
      "emoji": "2️⃣"
     },
     {
      "en": "three",
      "vi": "số ba",
      "emoji": "3️⃣"
     },
     {
      "en": "four",
      "vi": "số bốn",
      "emoji": "4️⃣"
     },
     {
      "en": "five",
      "vi": "số năm",
      "emoji": "5️⃣"
     },
     {
      "en": "six",
      "vi": "số sáu",
      "emoji": "6️⃣"
     },
     {
      "en": "seven",
      "vi": "số bảy",
      "emoji": "7️⃣"
     },
     {
      "en": "eight",
      "vi": "số tám",
      "emoji": "8️⃣"
     },
     {
      "en": "nine",
      "vi": "số chín",
      "emoji": "9️⃣"
     },
     {
      "en": "ten",
      "vi": "số mười",
      "emoji": "🔟"
     }
    ]
   },
   {
    "title": "Gia đình (Family)",
    "topic": "family",
    "emoji": "👨‍👩‍👧‍👦",
    "items": [
     {
      "en": "father",
      "vi": "bố",
      "emoji": "👨"
     },
     {
      "en": "mother",
      "vi": "mẹ",
      "emoji": "👩"
     },
     {
      "en": "brother",
      "vi": "anh trai",
      "emoji": "👦"
     },
     {
      "en": "sister",
      "vi": "chị gái",
      "emoji": "👧"
     },
     {
      "en": "baby",
      "vi": "em bé",
      "emoji": "👶"
     },
     {
      "en": "grandfather",
      "vi": "ông",
      "emoji": "👴"
     },
     {
      "en": "grandmother",
      "vi": "bà",
      "emoji": "👵"
     },
     {
      "en": "family",
      "vi": "gia đình",
      "emoji": "👨‍👩‍👧‍👦"
     }
    ]
   },
   {
    "title": "Bộ phận cơ thể (Body)",
    "topic": "body",
    "emoji": "🧍",
    "items": [
     {
      "en": "eye",
      "vi": "mắt",
      "emoji": "👁️"
     },
     {
      "en": "ear",
      "vi": "tai",
      "emoji": "👂"
     },
     {
      "en": "nose",
      "vi": "mũi",
      "emoji": "👃"
     },
     {
      "en": "mouth",
      "vi": "miệng",
      "emoji": "👄"
     },
     {
      "en": "hand",
      "vi": "bàn tay",
      "emoji": "✋"
     },
     {
      "en": "foot",
      "vi": "bàn chân",
      "emoji": "🦶"
     },
     {
      "en": "arm",
      "vi": "cánh tay",
      "emoji": "💪"
     },
     {
      "en": "leg",
      "vi": "chân",
      "emoji": "🦵"
     }
    ]
   },
   {
    "title": "Đồ chơi (Toys)",
    "topic": "toys",
    "emoji": "🧸",
    "items": [
     {
      "en": "ball",
      "vi": "quả bóng",
      "emoji": "⚽"
     },
     {
      "en": "teddy bear",
      "vi": "gấu bông",
      "emoji": "🧸"
     },
     {
      "en": "car",
      "vi": "ô tô đồ chơi",
      "emoji": "🚗"
     },
     {
      "en": "kite",
      "vi": "con diều",
      "emoji": "🪁"
     },
     {
      "en": "plane",
      "vi": "máy bay đồ chơi",
      "emoji": "✈️"
     },
     {
      "en": "robot",
      "vi": "người máy",
      "emoji": "🤖"
     },
     {
      "en": "train",
      "vi": "tàu hỏa",
      "emoji": "🚂"
     },
     {
      "en": "balloon",
      "vi": "quả bóng bay",
      "emoji": "🎈"
     },
     {
      "en": "doll",
      "vi": "búp bê",
      "emoji": "🪆"
     },
     {
      "en": "yo-yo",
      "vi": "yo-yo",
      "emoji": "🪀"
     }
    ]
   },
   {
    "title": "Thú cưng (Pets)",
    "topic": "pets",
    "emoji": "🐶",
    "items": [
     {
      "en": "dog",
      "vi": "con chó",
      "emoji": "🐶"
     },
     {
      "en": "cat",
      "vi": "con mèo",
      "emoji": "🐱"
     },
     {
      "en": "fish",
      "vi": "con cá",
      "emoji": "🐟"
     },
     {
      "en": "bird",
      "vi": "con chim",
      "emoji": "🐦"
     },
     {
      "en": "rabbit",
      "vi": "con thỏ",
      "emoji": "🐰"
     },
     {
      "en": "hamster",
      "vi": "chuột hamster",
      "emoji": "🐹"
     },
     {
      "en": "turtle",
      "vi": "con rùa",
      "emoji": "🐢"
     },
     {
      "en": "duck",
      "vi": "con vịt",
      "emoji": "🦆"
     },
     {
      "en": "chicken",
      "vi": "con gà",
      "emoji": "🐔"
     }
    ]
   },
   {
    "title": "Trái cây (Fruit)",
    "topic": "fruit",
    "emoji": "🍎",
    "items": [
     {
      "en": "apple",
      "vi": "quả táo",
      "emoji": "🍎"
     },
     {
      "en": "banana",
      "vi": "quả chuối",
      "emoji": "🍌"
     },
     {
      "en": "mango",
      "vi": "quả xoài",
      "emoji": "🥭"
     },
     {
      "en": "grapes",
      "vi": "quả nho",
      "emoji": "🍇"
     },
     {
      "en": "watermelon",
      "vi": "quả dưa hấu",
      "emoji": "🍉"
     },
     {
      "en": "strawberry",
      "vi": "quả dâu tây",
      "emoji": "🍓"
     },
     {
      "en": "pineapple",
      "vi": "quả dứa",
      "emoji": "🍍"
     },
     {
      "en": "lemon",
      "vi": "quả chanh",
      "emoji": "🍋"
     },
     {
      "en": "pear",
      "vi": "quả lê",
      "emoji": "🍐"
     }
    ]
   }
  ]
 },
 {
  "grade": 2,
  "title": "Lớp 2",
  "subtitle": "Từ vựng tiếng Anh lớp 2 theo chương trình Global Success (Bộ GD&ĐT): đồ chơi, đồ ăn, con vật, màu sắc, số đếm...",
  "units": [
   {
    "title": "Đồ chơi (Toys)",
    "topic": "toys",
    "emoji": "🧸",
    "items": [
     {
      "en": "ball",
      "vi": "quả bóng",
      "emoji": "⚽"
     },
     {
      "en": "doll",
      "vi": "búp bê",
      "emoji": "🪆"
     },
     {
      "en": "teddy bear",
      "vi": "gấu bông",
      "emoji": "🧸"
     },
     {
      "en": "robot",
      "vi": "người máy",
      "emoji": "🤖"
     },
     {
      "en": "car",
      "vi": "ô tô",
      "emoji": "🚗"
     },
     {
      "en": "kite",
      "vi": "con diều",
      "emoji": "🪁"
     },
     {
      "en": "balloon",
      "vi": "bóng bay",
      "emoji": "🎈"
     },
     {
      "en": "train",
      "vi": "tàu hỏa",
      "emoji": "🚂"
     },
     {
      "en": "plane",
      "vi": "máy bay",
      "emoji": "✈️"
     }
    ]
   },
   {
    "title": "Đồ ăn & thức uống (Food and drink)",
    "topic": "food-drink",
    "emoji": "🍽️",
    "items": [
     {
      "en": "rice",
      "vi": "cơm",
      "emoji": "🍚"
     },
     {
      "en": "bread",
      "vi": "bánh mì",
      "emoji": "🍞"
     },
     {
      "en": "fish",
      "vi": "cá",
      "emoji": "🐟"
     },
     {
      "en": "chicken",
      "vi": "thịt gà",
      "emoji": "🍗"
     },
     {
      "en": "meat",
      "vi": "thịt",
      "emoji": "🥩"
     },
     {
      "en": "egg",
      "vi": "trứng",
      "emoji": "🥚"
     },
     {
      "en": "noodles",
      "vi": "mì",
      "emoji": "🍜"
     },
     {
      "en": "milk",
      "vi": "sữa",
      "emoji": "🥛"
     },
     {
      "en": "water",
      "vi": "nước",
      "emoji": "💧"
     },
     {
      "en": "juice",
      "vi": "nước ép",
      "emoji": "🧃"
     }
    ]
   },
   {
    "title": "Đồ dùng học tập (School things)",
    "topic": "school-things",
    "emoji": "🎒",
    "items": [
     {
      "en": "book",
      "vi": "quyển sách",
      "emoji": "📖"
     },
     {
      "en": "pen",
      "vi": "bút mực",
      "emoji": "🖊️"
     },
     {
      "en": "pencil",
      "vi": "bút chì",
      "emoji": "✏️"
     },
     {
      "en": "ruler",
      "vi": "thước kẻ",
      "emoji": "📏"
     },
     {
      "en": "crayon",
      "vi": "bút sáp",
      "emoji": "🖍️"
     },
     {
      "en": "rubber",
      "vi": "cục tẩy",
      "emoji": ""
     },
     {
      "en": "school bag",
      "vi": "cặp sách",
      "emoji": "🎒"
     },
     {
      "en": "notebook",
      "vi": "quyển vở",
      "emoji": "📔"
     },
     {
      "en": "chair",
      "vi": "cái ghế",
      "emoji": "🪑"
     }
    ]
   },
   {
    "title": "Con vật (Animals)",
    "topic": "animals",
    "emoji": "🐾",
    "items": [
     {
      "en": "cat",
      "vi": "con mèo",
      "emoji": "🐱"
     },
     {
      "en": "dog",
      "vi": "con chó",
      "emoji": "🐶"
     },
     {
      "en": "bird",
      "vi": "con chim",
      "emoji": "🐦"
     },
     {
      "en": "duck",
      "vi": "con vịt",
      "emoji": "🦆"
     },
     {
      "en": "cow",
      "vi": "con bò",
      "emoji": "🐮"
     },
     {
      "en": "pig",
      "vi": "con lợn",
      "emoji": "🐷"
     },
     {
      "en": "rabbit",
      "vi": "con thỏ",
      "emoji": "🐰"
     },
     {
      "en": "horse",
      "vi": "con ngựa",
      "emoji": "🐴"
     },
     {
      "en": "elephant",
      "vi": "con voi",
      "emoji": "🐘"
     },
     {
      "en": "monkey",
      "vi": "con khỉ",
      "emoji": "🐵"
     }
    ]
   },
   {
    "title": "Gia đình (Family)",
    "topic": "family",
    "emoji": "👨‍👩‍👧‍👦",
    "items": [
     {
      "en": "father",
      "vi": "bố",
      "emoji": "👨"
     },
     {
      "en": "mother",
      "vi": "mẹ",
      "emoji": "👩"
     },
     {
      "en": "brother",
      "vi": "anh trai",
      "emoji": "👦"
     },
     {
      "en": "sister",
      "vi": "chị gái",
      "emoji": "👧"
     },
     {
      "en": "grandfather",
      "vi": "ông",
      "emoji": "👴"
     },
     {
      "en": "grandmother",
      "vi": "bà",
      "emoji": "👵"
     },
     {
      "en": "baby",
      "vi": "em bé",
      "emoji": "👶"
     },
     {
      "en": "family",
      "vi": "gia đình",
      "emoji": "👨‍👩‍👧‍👦"
     }
    ]
   },
   {
    "title": "Khuôn mặt & cơ thể (Face and body)",
    "topic": "body",
    "emoji": "🧑",
    "items": [
     {
      "en": "face",
      "vi": "khuôn mặt",
      "emoji": "🙂"
     },
     {
      "en": "eye",
      "vi": "mắt",
      "emoji": "👁️"
     },
     {
      "en": "nose",
      "vi": "mũi",
      "emoji": "👃"
     },
     {
      "en": "mouth",
      "vi": "miệng",
      "emoji": "👄"
     },
     {
      "en": "ear",
      "vi": "tai",
      "emoji": "👂"
     },
     {
      "en": "hand",
      "vi": "bàn tay",
      "emoji": "✋"
     },
     {
      "en": "arm",
      "vi": "cánh tay",
      "emoji": "💪"
     },
     {
      "en": "leg",
      "vi": "chân",
      "emoji": "🦵"
     },
     {
      "en": "foot",
      "vi": "bàn chân",
      "emoji": "🦶"
     }
    ]
   },
   {
    "title": "Màu sắc (Colours)",
    "topic": "colours",
    "emoji": "🌈",
    "items": [
     {
      "en": "red",
      "vi": "màu đỏ",
      "emoji": "❤️"
     },
     {
      "en": "blue",
      "vi": "màu xanh dương",
      "emoji": "💙"
     },
     {
      "en": "green",
      "vi": "màu xanh lá",
      "emoji": "💚"
     },
     {
      "en": "yellow",
      "vi": "màu vàng",
      "emoji": "💛"
     },
     {
      "en": "orange",
      "vi": "màu cam",
      "emoji": "🧡"
     },
     {
      "en": "pink",
      "vi": "màu hồng",
      "emoji": "🩷"
     },
     {
      "en": "purple",
      "vi": "màu tím",
      "emoji": "💜"
     },
     {
      "en": "black",
      "vi": "màu đen",
      "emoji": "🖤"
     },
     {
      "en": "white",
      "vi": "màu trắng",
      "emoji": "🤍"
     },
     {
      "en": "brown",
      "vi": "màu nâu",
      "emoji": "🤎"
     }
    ]
   },
   {
    "title": "Số đếm (Numbers 1-10)",
    "topic": "numbers",
    "emoji": "🔢",
    "items": [
     {
      "en": "one",
      "vi": "một",
      "emoji": "1️⃣"
     },
     {
      "en": "two",
      "vi": "hai",
      "emoji": "2️⃣"
     },
     {
      "en": "three",
      "vi": "ba",
      "emoji": "3️⃣"
     },
     {
      "en": "four",
      "vi": "bốn",
      "emoji": "4️⃣"
     },
     {
      "en": "five",
      "vi": "năm",
      "emoji": "5️⃣"
     },
     {
      "en": "six",
      "vi": "sáu",
      "emoji": "6️⃣"
     },
     {
      "en": "seven",
      "vi": "bảy",
      "emoji": "7️⃣"
     },
     {
      "en": "eight",
      "vi": "tám",
      "emoji": "8️⃣"
     },
     {
      "en": "nine",
      "vi": "chín",
      "emoji": "9️⃣"
     },
     {
      "en": "ten",
      "vi": "mười",
      "emoji": "🔟"
     }
    ]
   }
  ]
 },
 {
  "grade": 3,
  "title": "Lớp 3",
  "subtitle": "Tiếng Anh 3 (Global Success) — 9 chủ đề, từ vựng kèm câu mẫu",
  "units": [
   {
    "title": "Chào hỏi (Hello)",
    "topic": "greetings",
    "emoji": "👋",
    "items": [
     {
      "en": "hello",
      "vi": "xin chào",
      "emoji": "👋"
     },
     {
      "en": "good morning",
      "vi": "chào buổi sáng",
      "emoji": "🌅"
     },
     {
      "en": "good afternoon",
      "vi": "chào buổi chiều",
      "emoji": "🌇"
     },
     {
      "en": "good night",
      "vi": "chúc ngủ ngon",
      "emoji": "🌙"
     },
     {
      "en": "goodbye",
      "vi": "tạm biệt",
      "emoji": "👋"
     },
     {
      "en": "thank you",
      "vi": "cảm ơn",
      "emoji": "🙏"
     },
     {
      "en": "name",
      "vi": "tên",
      "emoji": "🏷️"
     },
     {
      "en": "fine",
      "vi": "khoẻ",
      "emoji": "😊"
     },
     {
      "en": "friend",
      "vi": "bạn",
      "emoji": "🧑‍🤝‍🧑"
     }
    ],
    "phrases": [
     {
      "en": "Hello! How are you?",
      "vi": "xin chào! bạn khoẻ không?"
     },
     {
      "en": "I'm fine, thank you.",
      "vi": "tôi khoẻ, cảm ơn bạn."
     },
     {
      "en": "What's your name?",
      "vi": "tên bạn là gì?"
     }
    ]
   },
   {
    "title": "Đồ dùng học tập (School things)",
    "topic": "school-things",
    "emoji": "🎒",
    "items": [
     {
      "en": "school",
      "vi": "trường học",
      "emoji": "🏫"
     },
     {
      "en": "pen",
      "vi": "cây bút mực",
      "emoji": "🖊️"
     },
     {
      "en": "pencil",
      "vi": "bút chì",
      "emoji": "✏️"
     },
     {
      "en": "book",
      "vi": "quyển sách",
      "emoji": "📖"
     },
     {
      "en": "notebook",
      "vi": "quyển vở",
      "emoji": "📓"
     },
     {
      "en": "ruler",
      "vi": "thước kẻ",
      "emoji": "📏"
     },
     {
      "en": "rubber",
      "vi": "cục tẩy",
      "emoji": ""
     },
     {
      "en": "pencil case",
      "vi": "hộp bút",
      "emoji": ""
     },
     {
      "en": "schoolbag",
      "vi": "cặp sách",
      "emoji": "🎒"
     }
    ],
    "phrases": [
     {
      "en": "This is my pen.",
      "vi": "đây là cây bút của tôi."
     },
     {
      "en": "What's this?",
      "vi": "đây là cái gì?"
     },
     {
      "en": "It's a book.",
      "vi": "đó là một quyển sách."
     }
    ]
   },
   {
    "title": "Màu sắc (Colours)",
    "topic": "colours",
    "emoji": "🎨",
    "items": [
     {
      "en": "red",
      "vi": "màu đỏ",
      "emoji": "🔴"
     },
     {
      "en": "blue",
      "vi": "màu xanh dương",
      "emoji": "🔵"
     },
     {
      "en": "yellow",
      "vi": "màu vàng",
      "emoji": "🟡"
     },
     {
      "en": "green",
      "vi": "màu xanh lá",
      "emoji": "🟢"
     },
     {
      "en": "orange",
      "vi": "màu cam",
      "emoji": "🟠"
     },
     {
      "en": "black",
      "vi": "màu đen",
      "emoji": "⚫"
     },
     {
      "en": "white",
      "vi": "màu trắng",
      "emoji": "⚪"
     },
     {
      "en": "pink",
      "vi": "màu hồng",
      "emoji": "🌸"
     },
     {
      "en": "brown",
      "vi": "màu nâu",
      "emoji": "🟤"
     }
    ],
    "phrases": [
     {
      "en": "What colour is it?",
      "vi": "nó màu gì?"
     },
     {
      "en": "It's red.",
      "vi": "nó màu đỏ."
     },
     {
      "en": "I like blue.",
      "vi": "tôi thích màu xanh dương."
     }
    ]
   },
   {
    "title": "Cơ thể (Our bodies)",
    "topic": "body",
    "emoji": "🧍",
    "items": [
     {
      "en": "body",
      "vi": "cơ thể",
      "emoji": "🧍"
     },
     {
      "en": "face",
      "vi": "khuôn mặt",
      "emoji": "😀"
     },
     {
      "en": "hair",
      "vi": "tóc",
      "emoji": "💇"
     },
     {
      "en": "eye",
      "vi": "mắt",
      "emoji": "👁️"
     },
     {
      "en": "ear",
      "vi": "tai",
      "emoji": "👂"
     },
     {
      "en": "nose",
      "vi": "mũi",
      "emoji": "👃"
     },
     {
      "en": "mouth",
      "vi": "miệng",
      "emoji": "👄"
     },
     {
      "en": "hand",
      "vi": "bàn tay",
      "emoji": "✋"
     },
     {
      "en": "arm",
      "vi": "cánh tay",
      "emoji": "💪"
     },
     {
      "en": "leg",
      "vi": "chân",
      "emoji": "🦵"
     }
    ],
    "phrases": [
     {
      "en": "This is my nose.",
      "vi": "đây là mũi của tôi."
     },
     {
      "en": "Touch your head.",
      "vi": "chạm vào đầu của bạn."
     },
     {
      "en": "I have two eyes.",
      "vi": "tôi có hai con mắt."
     }
    ]
   },
   {
    "title": "Gia đình tôi (My family)",
    "topic": "family",
    "emoji": "👨‍👩‍👧‍👦",
    "items": [
     {
      "en": "family",
      "vi": "gia đình",
      "emoji": "👨‍👩‍👧‍👦"
     },
     {
      "en": "father",
      "vi": "bố",
      "emoji": "👨"
     },
     {
      "en": "mother",
      "vi": "mẹ",
      "emoji": "👩"
     },
     {
      "en": "brother",
      "vi": "anh trai",
      "emoji": "👦"
     },
     {
      "en": "sister",
      "vi": "chị gái",
      "emoji": "👧"
     },
     {
      "en": "grandfather",
      "vi": "ông",
      "emoji": "👴"
     },
     {
      "en": "grandmother",
      "vi": "bà",
      "emoji": "👵"
     },
     {
      "en": "baby",
      "vi": "em bé",
      "emoji": "👶"
     }
    ],
    "phrases": [
     {
      "en": "This is my family.",
      "vi": "đây là gia đình tôi."
     },
     {
      "en": "Who's this?",
      "vi": "đây là ai?"
     },
     {
      "en": "This is my father.",
      "vi": "đây là bố của tôi."
     }
    ]
   },
   {
    "title": "Ngôi nhà (My house)",
    "topic": "house",
    "emoji": "🏠",
    "items": [
     {
      "en": "house",
      "vi": "ngôi nhà",
      "emoji": "🏠"
     },
     {
      "en": "living room",
      "vi": "phòng khách",
      "emoji": "🛋️"
     },
     {
      "en": "bedroom",
      "vi": "phòng ngủ",
      "emoji": "🛏️"
     },
     {
      "en": "kitchen",
      "vi": "nhà bếp",
      "emoji": "🍳"
     },
     {
      "en": "bathroom",
      "vi": "phòng tắm",
      "emoji": "🛁"
     },
     {
      "en": "dining room",
      "vi": "phòng ăn",
      "emoji": "🍽️"
     },
     {
      "en": "garden",
      "vi": "khu vườn",
      "emoji": "🌳"
     },
     {
      "en": "door",
      "vi": "cửa ra vào",
      "emoji": "🚪"
     },
     {
      "en": "window",
      "vi": "cửa sổ",
      "emoji": "🪟"
     }
    ],
    "phrases": [
     {
      "en": "This is my house.",
      "vi": "đây là nhà của tôi."
     },
     {
      "en": "It's in the kitchen.",
      "vi": "nó ở trong nhà bếp."
     },
     {
      "en": "There is a garden.",
      "vi": "có một khu vườn."
     }
    ]
   },
   {
    "title": "Đồ chơi (My toys)",
    "topic": "toys",
    "emoji": "🧸",
    "items": [
     {
      "en": "toy",
      "vi": "đồ chơi",
      "emoji": "🧸"
     },
     {
      "en": "ball",
      "vi": "quả bóng",
      "emoji": "🏀"
     },
     {
      "en": "doll",
      "vi": "búp bê",
      "emoji": "🪆"
     },
     {
      "en": "car",
      "vi": "ô tô đồ chơi",
      "emoji": "🚗"
     },
     {
      "en": "plane",
      "vi": "máy bay đồ chơi",
      "emoji": "✈️"
     },
     {
      "en": "robot",
      "vi": "người máy",
      "emoji": "🤖"
     },
     {
      "en": "kite",
      "vi": "con diều",
      "emoji": "🪁"
     },
     {
      "en": "yo-yo",
      "vi": "yo-yo",
      "emoji": "🪀"
     },
     {
      "en": "ship",
      "vi": "con tàu thuỷ",
      "emoji": "🚢"
     }
    ],
    "phrases": [
     {
      "en": "I have a robot.",
      "vi": "tôi có một người máy."
     },
     {
      "en": "It's a nice doll.",
      "vi": "đó là một con búp bê đẹp."
     },
     {
      "en": "I like my kite.",
      "vi": "tôi thích con diều của tôi."
     }
    ]
   },
   {
    "title": "Thú cưng & con vật (Pets)",
    "topic": "pets",
    "emoji": "🐶",
    "items": [
     {
      "en": "pet",
      "vi": "thú cưng",
      "emoji": "🐾"
     },
     {
      "en": "dog",
      "vi": "con chó",
      "emoji": "🐶"
     },
     {
      "en": "cat",
      "vi": "con mèo",
      "emoji": "🐱"
     },
     {
      "en": "fish",
      "vi": "con cá",
      "emoji": "🐟"
     },
     {
      "en": "bird",
      "vi": "con chim",
      "emoji": "🐦"
     },
     {
      "en": "rabbit",
      "vi": "con thỏ",
      "emoji": "🐰"
     },
     {
      "en": "parrot",
      "vi": "con vẹt",
      "emoji": "🦜"
     },
     {
      "en": "goldfish",
      "vi": "cá vàng",
      "emoji": "🐠"
     },
     {
      "en": "tortoise",
      "vi": "con rùa",
      "emoji": "🐢"
     }
    ],
    "phrases": [
     {
      "en": "I have a dog.",
      "vi": "tôi có một con chó."
     },
     {
      "en": "Do you have any pets?",
      "vi": "bạn có nuôi thú cưng không?"
     },
     {
      "en": "It's a cat.",
      "vi": "đó là một con mèo."
     }
    ]
   },
   {
    "title": "Hoạt động giải trí (Free time)",
    "topic": "free-time",
    "emoji": "🏸",
    "items": [
     {
      "en": "play football",
      "vi": "chơi bóng đá",
      "emoji": "⚽"
     },
     {
      "en": "play badminton",
      "vi": "chơi cầu lông",
      "emoji": "🏸"
     },
     {
      "en": "play chess",
      "vi": "chơi cờ vua",
      "emoji": "♟️"
     },
     {
      "en": "skip",
      "vi": "nhảy dây",
      "emoji": ""
     },
     {
      "en": "cycle",
      "vi": "đạp xe",
      "emoji": "🚲"
     },
     {
      "en": "sing",
      "vi": "hát",
      "emoji": "🎤"
     },
     {
      "en": "dance",
      "vi": "nhảy múa",
      "emoji": "💃"
     },
     {
      "en": "draw",
      "vi": "vẽ",
      "emoji": "🖍️"
     },
     {
      "en": "read",
      "vi": "đọc sách",
      "emoji": "📚"
     }
    ],
    "phrases": [
     {
      "en": "I like football.",
      "vi": "tôi thích bóng đá."
     },
     {
      "en": "Let's play chess.",
      "vi": "chúng ta chơi cờ vua nào."
     },
     {
      "en": "I can sing.",
      "vi": "tôi có thể hát."
     }
    ]
   }
  ]
 },
 {
  "grade": 4,
  "title": "Lớp 4",
  "subtitle": "Giờ giấc, môn học, sở thích, nghề nghiệp, nơi chốn, đồ ăn, thể thao & con vật",
  "units": [
   {
    "title": "Hoạt động hằng ngày & giờ giấc (Daily Routines & Time)",
    "topic": "daily-routines",
    "emoji": "⏰",
    "items": [
     {
      "en": "get up",
      "vi": "thức dậy",
      "emoji": "🛏️"
     },
     {
      "en": "have breakfast",
      "vi": "ăn sáng",
      "emoji": "🍳"
     },
     {
      "en": "go to school",
      "vi": "đi học",
      "emoji": "🎒"
     },
     {
      "en": "have lunch",
      "vi": "ăn trưa",
      "emoji": "🍚"
     },
     {
      "en": "do homework",
      "vi": "làm bài tập về nhà",
      "emoji": "📝"
     },
     {
      "en": "watch TV",
      "vi": "xem ti vi",
      "emoji": "📺"
     },
     {
      "en": "have dinner",
      "vi": "ăn tối",
      "emoji": "🍽️"
     },
     {
      "en": "go to bed",
      "vi": "đi ngủ",
      "emoji": "🛌"
     },
     {
      "en": "o'clock",
      "vi": "giờ (đúng giờ)",
      "emoji": "🕐"
     }
    ],
    "phrases": [
     {
      "en": "What time is it?",
      "vi": "bây giờ là mấy giờ?"
     },
     {
      "en": "It's seven o'clock.",
      "vi": "bây giờ là bảy giờ."
     },
     {
      "en": "What time do you get up?",
      "vi": "bạn thức dậy lúc mấy giờ?"
     },
     {
      "en": "I get up at six o'clock.",
      "vi": "tôi thức dậy lúc sáu giờ."
     }
    ]
   },
   {
    "title": "Môn học & thời khoá biểu (School Subjects)",
    "topic": "school-subjects",
    "emoji": "📚",
    "items": [
     {
      "en": "maths",
      "vi": "môn toán",
      "emoji": "➗"
     },
     {
      "en": "English",
      "vi": "môn tiếng anh",
      "emoji": "🔤"
     },
     {
      "en": "Vietnamese",
      "vi": "môn tiếng việt",
      "emoji": "🇻🇳"
     },
     {
      "en": "science",
      "vi": "môn khoa học",
      "emoji": "🔬"
     },
     {
      "en": "art",
      "vi": "môn mĩ thuật",
      "emoji": "🎨"
     },
     {
      "en": "music",
      "vi": "môn âm nhạc",
      "emoji": "🎵"
     },
     {
      "en": "PE",
      "vi": "môn thể dục",
      "emoji": "🤸"
     },
     {
      "en": "IT",
      "vi": "môn tin học",
      "emoji": "💻"
     },
     {
      "en": "timetable",
      "vi": "thời khoá biểu",
      "emoji": "📅"
     }
    ],
    "phrases": [
     {
      "en": "What subjects do you have today?",
      "vi": "hôm nay bạn có những môn học nào?"
     },
     {
      "en": "I have Maths and English.",
      "vi": "tôi có môn toán và tiếng anh."
     },
     {
      "en": "What is your favourite subject?",
      "vi": "môn học yêu thích của bạn là gì?"
     },
     {
      "en": "My favourite subject is Art.",
      "vi": "môn học yêu thích của tôi là mĩ thuật."
     }
    ]
   },
   {
    "title": "Sở thích (Hobbies)",
    "topic": "hobbies",
    "emoji": "🎨",
    "items": [
     {
      "en": "cooking",
      "vi": "nấu ăn",
      "emoji": "🍳"
     },
     {
      "en": "cycling",
      "vi": "đạp xe",
      "emoji": "🚴"
     },
     {
      "en": "dancing",
      "vi": "nhảy múa",
      "emoji": "💃"
     },
     {
      "en": "drawing",
      "vi": "vẽ",
      "emoji": "✏️"
     },
     {
      "en": "fishing",
      "vi": "câu cá",
      "emoji": "🎣"
     },
     {
      "en": "reading",
      "vi": "đọc sách",
      "emoji": "📖"
     },
     {
      "en": "singing",
      "vi": "hát",
      "emoji": "🎤"
     },
     {
      "en": "swimming",
      "vi": "bơi",
      "emoji": "🏊"
     },
     {
      "en": "collecting stamps",
      "vi": "sưu tầm tem",
      "emoji": "📮"
     },
     {
      "en": "playing chess",
      "vi": "chơi cờ",
      "emoji": "♟️"
     }
    ],
    "phrases": [
     {
      "en": "What is your hobby?",
      "vi": "sở thích của bạn là gì?"
     },
     {
      "en": "My hobby is drawing.",
      "vi": "sở thích của tôi là vẽ."
     },
     {
      "en": "I like reading books.",
      "vi": "tôi thích đọc sách."
     }
    ]
   },
   {
    "title": "Nghề nghiệp (Jobs)",
    "topic": "jobs",
    "emoji": "👩‍🏫",
    "items": [
     {
      "en": "doctor",
      "vi": "bác sĩ",
      "emoji": "👨‍⚕️"
     },
     {
      "en": "teacher",
      "vi": "giáo viên",
      "emoji": "👩‍🏫"
     },
     {
      "en": "nurse",
      "vi": "y tá",
      "emoji": "👩‍⚕️"
     },
     {
      "en": "farmer",
      "vi": "nông dân",
      "emoji": "👨‍🌾"
     },
     {
      "en": "worker",
      "vi": "công nhân",
      "emoji": "👷"
     },
     {
      "en": "driver",
      "vi": "tài xế",
      "emoji": "🚕"
     },
     {
      "en": "pilot",
      "vi": "phi công",
      "emoji": "👨‍✈️"
     },
     {
      "en": "singer",
      "vi": "ca sĩ",
      "emoji": "🧑‍🎤"
     },
     {
      "en": "cook",
      "vi": "đầu bếp",
      "emoji": "👨‍🍳"
     }
    ],
    "phrases": [
     {
      "en": "What do you want to be in the future?",
      "vi": "bạn muốn làm nghề gì trong tương lai?"
     },
     {
      "en": "I want to be a doctor.",
      "vi": "tôi muốn trở thành bác sĩ."
     },
     {
      "en": "I want to be a teacher.",
      "vi": "tôi muốn trở thành giáo viên."
     }
    ]
   },
   {
    "title": "Địa điểm trong thị trấn (Places in Town)",
    "topic": "places-in-town",
    "emoji": "🏙️",
    "items": [
     {
      "en": "hospital",
      "vi": "bệnh viện",
      "emoji": "🏥"
     },
     {
      "en": "supermarket",
      "vi": "siêu thị",
      "emoji": "🛒"
     },
     {
      "en": "post office",
      "vi": "bưu điện",
      "emoji": "🏤"
     },
     {
      "en": "cinema",
      "vi": "rạp chiếu phim",
      "emoji": "🎬"
     },
     {
      "en": "museum",
      "vi": "bảo tàng",
      "emoji": "🏛️"
     },
     {
      "en": "park",
      "vi": "công viên",
      "emoji": "🏞️"
     },
     {
      "en": "zoo",
      "vi": "sở thú",
      "emoji": "🦁"
     },
     {
      "en": "bookshop",
      "vi": "hiệu sách",
      "emoji": "📚"
     },
     {
      "en": "restaurant",
      "vi": "nhà hàng",
      "emoji": "🍽️"
     },
     {
      "en": "bank",
      "vi": "ngân hàng",
      "emoji": "🏦"
     }
    ],
    "phrases": [
     {
      "en": "Where is the hospital?",
      "vi": "bệnh viện ở đâu?"
     },
     {
      "en": "It's next to the park.",
      "vi": "nó ở cạnh công viên."
     },
     {
      "en": "Is there a supermarket near here?",
      "vi": "gần đây có siêu thị không?"
     }
    ]
   },
   {
    "title": "Bữa ăn & đồ ăn (Meals & Food)",
    "topic": "food",
    "emoji": "🍚",
    "items": [
     {
      "en": "rice",
      "vi": "cơm",
      "emoji": "🍚"
     },
     {
      "en": "noodles",
      "vi": "mì",
      "emoji": "🍜"
     },
     {
      "en": "bread",
      "vi": "bánh mì",
      "emoji": "🍞"
     },
     {
      "en": "fish",
      "vi": "cá",
      "emoji": "🐟"
     },
     {
      "en": "meat",
      "vi": "thịt",
      "emoji": "🍖"
     },
     {
      "en": "chicken",
      "vi": "thịt gà",
      "emoji": "🍗"
     },
     {
      "en": "vegetables",
      "vi": "rau",
      "emoji": "🥬"
     },
     {
      "en": "milk",
      "vi": "sữa",
      "emoji": "🥛"
     },
     {
      "en": "egg",
      "vi": "trứng",
      "emoji": "🥚"
     },
     {
      "en": "juice",
      "vi": "nước ép",
      "emoji": "🧃"
     }
    ],
    "phrases": [
     {
      "en": "What would you like to eat?",
      "vi": "bạn muốn ăn gì?"
     },
     {
      "en": "I'd like some rice and fish.",
      "vi": "tôi muốn ăn cơm và cá."
     },
     {
      "en": "Would you like some milk?",
      "vi": "bạn có muốn uống sữa không?"
     }
    ]
   },
   {
    "title": "Thể thao (Sports)",
    "topic": "sports",
    "emoji": "⚽",
    "items": [
     {
      "en": "football",
      "vi": "bóng đá",
      "emoji": "⚽"
     },
     {
      "en": "basketball",
      "vi": "bóng rổ",
      "emoji": "🏀"
     },
     {
      "en": "badminton",
      "vi": "cầu lông",
      "emoji": "🏸"
     },
     {
      "en": "table tennis",
      "vi": "bóng bàn",
      "emoji": "🏓"
     },
     {
      "en": "volleyball",
      "vi": "bóng chuyền",
      "emoji": "🏐"
     },
     {
      "en": "tennis",
      "vi": "quần vợt",
      "emoji": "🎾"
     },
     {
      "en": "running",
      "vi": "chạy bộ",
      "emoji": "🏃"
     },
     {
      "en": "skipping",
      "vi": "nhảy dây",
      "emoji": "🪢"
     }
    ],
    "phrases": [
     {
      "en": "What sport do you like?",
      "vi": "bạn thích môn thể thao nào?"
     },
     {
      "en": "I like playing football.",
      "vi": "tôi thích chơi bóng đá."
     },
     {
      "en": "Can you play badminton?",
      "vi": "bạn có biết chơi cầu lông không?"
     }
    ]
   },
   {
    "title": "Thế giới quanh ta - Con vật (Animals)",
    "topic": "animals",
    "emoji": "🐘",
    "items": [
     {
      "en": "elephant",
      "vi": "con voi",
      "emoji": "🐘"
     },
     {
      "en": "tiger",
      "vi": "con hổ",
      "emoji": "🐯"
     },
     {
      "en": "monkey",
      "vi": "con khỉ",
      "emoji": "🐵"
     },
     {
      "en": "lion",
      "vi": "con sư tử",
      "emoji": "🦁"
     },
     {
      "en": "bear",
      "vi": "con gấu",
      "emoji": "🐻"
     },
     {
      "en": "zebra",
      "vi": "con ngựa vằn",
      "emoji": "🦓"
     },
     {
      "en": "crocodile",
      "vi": "con cá sấu",
      "emoji": "🐊"
     },
     {
      "en": "giraffe",
      "vi": "con hươu cao cổ",
      "emoji": "🦒"
     },
     {
      "en": "panda",
      "vi": "con gấu trúc",
      "emoji": "🐼"
     },
     {
      "en": "peacock",
      "vi": "con công",
      "emoji": "🦚"
     }
    ],
    "phrases": [
     {
      "en": "What animals do you like?",
      "vi": "bạn thích con vật nào?"
     },
     {
      "en": "I like elephants.",
      "vi": "tôi thích những con voi."
     },
     {
      "en": "Look at the tiger!",
      "vi": "nhìn con hổ kìa!"
     }
    ]
   }
  ]
 },
 {
  "grade": 5,
  "title": "Lớp 5",
  "subtitle": "Từ vựng tiếng Anh 5 (Global Success) theo chủ đề",
  "units": [
   {
    "title": "Quốc gia & quốc tịch (Countries and Nationalities)",
    "topic": "countries",
    "emoji": "🌍",
    "items": [
     {
      "en": "country",
      "vi": "quốc gia",
      "emoji": "🌍"
     },
     {
      "en": "nationality",
      "vi": "quốc tịch",
      "emoji": "🪪"
     },
     {
      "en": "Vietnam",
      "vi": "việt nam",
      "emoji": "🇻🇳"
     },
     {
      "en": "Vietnamese",
      "vi": "người việt nam",
      "emoji": ""
     },
     {
      "en": "America",
      "vi": "nước mỹ",
      "emoji": "🇺🇸"
     },
     {
      "en": "England",
      "vi": "nước anh",
      "emoji": "🇬🇧"
     },
     {
      "en": "Australia",
      "vi": "nước úc",
      "emoji": "🇦🇺"
     },
     {
      "en": "Japan",
      "vi": "nhật bản",
      "emoji": "🇯🇵"
     }
    ],
    "phrases": [
     {
      "en": "Where are you from?",
      "vi": "bạn đến từ đâu?"
     },
     {
      "en": "I'm from Viet Nam.",
      "vi": "mình đến từ việt nam."
     },
     {
      "en": "What nationality are you?",
      "vi": "bạn mang quốc tịch gì?"
     },
     {
      "en": "I'm Vietnamese.",
      "vi": "mình là người việt nam."
     }
    ]
   },
   {
    "title": "Thói quen hằng ngày (Daily Routines)",
    "topic": "daily-routines",
    "emoji": "⏰",
    "items": [
     {
      "en": "get up",
      "vi": "thức dậy",
      "emoji": "⏰"
     },
     {
      "en": "brush one's teeth",
      "vi": "đánh răng",
      "emoji": "🪥"
     },
     {
      "en": "have breakfast",
      "vi": "ăn sáng",
      "emoji": "🍳"
     },
     {
      "en": "go to school",
      "vi": "đi học",
      "emoji": "🎒"
     },
     {
      "en": "do homework",
      "vi": "làm bài tập về nhà",
      "emoji": "✏️"
     },
     {
      "en": "have dinner",
      "vi": "ăn tối",
      "emoji": "🍽️"
     },
     {
      "en": "go to bed",
      "vi": "đi ngủ",
      "emoji": "🛏️"
     },
     {
      "en": "always",
      "vi": "luôn luôn",
      "emoji": ""
     },
     {
      "en": "early",
      "vi": "sớm",
      "emoji": ""
     }
    ],
    "phrases": [
     {
      "en": "What do you do in the morning?",
      "vi": "buổi sáng bạn làm gì?"
     },
     {
      "en": "I always get up early.",
      "vi": "mình luôn thức dậy sớm."
     },
     {
      "en": "I usually go to bed at nine.",
      "vi": "mình thường đi ngủ lúc chín giờ."
     }
    ]
   },
   {
    "title": "Đời sống học đường (School Life)",
    "topic": "school-life",
    "emoji": "🏫",
    "items": [
     {
      "en": "maths",
      "vi": "môn toán",
      "emoji": "➗"
     },
     {
      "en": "English",
      "vi": "môn tiếng anh",
      "emoji": "🔤"
     },
     {
      "en": "science",
      "vi": "môn khoa học",
      "emoji": "🔬"
     },
     {
      "en": "music",
      "vi": "môn âm nhạc",
      "emoji": "🎵"
     },
     {
      "en": "art",
      "vi": "môn mĩ thuật",
      "emoji": "🎨"
     },
     {
      "en": "timetable",
      "vi": "thời khoá biểu",
      "emoji": "🗓️"
     },
     {
      "en": "lesson",
      "vi": "bài học",
      "emoji": "📖"
     },
     {
      "en": "library",
      "vi": "thư viện",
      "emoji": "📚"
     }
    ],
    "phrases": [
     {
      "en": "How many lessons do you have today?",
      "vi": "hôm nay bạn có mấy tiết học?"
     },
     {
      "en": "I have English and Maths.",
      "vi": "mình có tiếng anh và toán."
     },
     {
      "en": "I learn English by reading books.",
      "vi": "mình học tiếng anh bằng cách đọc sách."
     }
    ]
   },
   {
    "title": "Du lịch & kỳ nghỉ (Holidays and Travel)",
    "topic": "holidays",
    "emoji": "🧳",
    "items": [
     {
      "en": "holiday",
      "vi": "kì nghỉ",
      "emoji": "🏖️"
     },
     {
      "en": "beach",
      "vi": "bãi biển",
      "emoji": "🏝️"
     },
     {
      "en": "mountain",
      "vi": "núi",
      "emoji": "⛰️"
     },
     {
      "en": "travel",
      "vi": "đi du lịch",
      "emoji": "✈️"
     },
     {
      "en": "boat",
      "vi": "thuyền",
      "emoji": "⛵"
     },
     {
      "en": "souvenir",
      "vi": "quà lưu niệm",
      "emoji": "🎁"
     },
     {
      "en": "suitcase",
      "vi": "va li",
      "emoji": "🧳"
     },
     {
      "en": "ticket",
      "vi": "vé",
      "emoji": "🎫"
     }
    ],
    "phrases": [
     {
      "en": "Where did you go on holiday?",
      "vi": "bạn đã đi nghỉ ở đâu?"
     },
     {
      "en": "I went to the beach.",
      "vi": "mình đã đi biển."
     },
     {
      "en": "I saw a big whale.",
      "vi": "mình đã nhìn thấy một con cá voi lớn."
     }
    ]
   },
   {
    "title": "Sức khoẻ & cảm xúc (Health and Feelings)",
    "topic": "health-feelings",
    "emoji": "🤒",
    "items": [
     {
      "en": "headache",
      "vi": "đau đầu",
      "emoji": "🤕"
     },
     {
      "en": "toothache",
      "vi": "đau răng",
      "emoji": "🦷"
     },
     {
      "en": "fever",
      "vi": "sốt",
      "emoji": "🌡️"
     },
     {
      "en": "cold",
      "vi": "cảm lạnh",
      "emoji": "🤧"
     },
     {
      "en": "tired",
      "vi": "mệt mỏi",
      "emoji": "😫"
     },
     {
      "en": "happy",
      "vi": "vui vẻ",
      "emoji": "😄"
     },
     {
      "en": "sad",
      "vi": "buồn",
      "emoji": "😢"
     },
     {
      "en": "doctor",
      "vi": "bác sĩ",
      "emoji": "👨‍⚕️"
     },
     {
      "en": "medicine",
      "vi": "thuốc",
      "emoji": "💊"
     }
    ],
    "phrases": [
     {
      "en": "What's the matter with you?",
      "vi": "bạn bị làm sao vậy?"
     },
     {
      "en": "I have a headache.",
      "vi": "mình bị đau đầu."
     },
     {
      "en": "You should see a doctor.",
      "vi": "bạn nên đi khám bác sĩ."
     }
    ]
   },
   {
    "title": "Nghề nghiệp tương lai (Future Jobs)",
    "topic": "future-jobs",
    "emoji": "👩‍⚕️",
    "items": [
     {
      "en": "teacher",
      "vi": "giáo viên",
      "emoji": "👩‍🏫"
     },
     {
      "en": "pilot",
      "vi": "phi công",
      "emoji": "👨‍✈️"
     },
     {
      "en": "nurse",
      "vi": "y tá",
      "emoji": "👩‍⚕️"
     },
     {
      "en": "farmer",
      "vi": "nông dân",
      "emoji": "👨‍🌾"
     },
     {
      "en": "engineer",
      "vi": "kĩ sư",
      "emoji": "👷"
     },
     {
      "en": "writer",
      "vi": "nhà văn",
      "emoji": "✍️"
     },
     {
      "en": "singer",
      "vi": "ca sĩ",
      "emoji": "🎤"
     },
     {
      "en": "architect",
      "vi": "kiến trúc sư",
      "emoji": "📐"
     }
    ],
    "phrases": [
     {
      "en": "What would you like to be in the future?",
      "vi": "sau này bạn muốn làm nghề gì?"
     },
     {
      "en": "I would like to be a pilot.",
      "vi": "mình muốn làm phi công."
     },
     {
      "en": "Because I like planes.",
      "vi": "vì mình thích máy bay."
     }
    ]
   },
   {
    "title": "Đồ ăn & nấu ăn (Food and Cooking)",
    "topic": "food",
    "emoji": "🍜",
    "items": [
     {
      "en": "rice",
      "vi": "cơm",
      "emoji": "🍚"
     },
     {
      "en": "noodles",
      "vi": "mì",
      "emoji": "🍜"
     },
     {
      "en": "fish",
      "vi": "cá",
      "emoji": "🐟"
     },
     {
      "en": "chicken",
      "vi": "thịt gà",
      "emoji": "🍗"
     },
     {
      "en": "vegetables",
      "vi": "rau",
      "emoji": "🥬"
     },
     {
      "en": "fruit",
      "vi": "trái cây",
      "emoji": "🍎"
     },
     {
      "en": "milk",
      "vi": "sữa",
      "emoji": "🥛"
     },
     {
      "en": "soup",
      "vi": "súp",
      "emoji": "🍲"
     }
    ],
    "phrases": [
     {
      "en": "What would you like to eat?",
      "vi": "bạn muốn ăn gì?"
     },
     {
      "en": "I would like some noodles.",
      "vi": "mình muốn ăn một ít mì."
     },
     {
      "en": "Would you like some water?",
      "vi": "bạn có muốn uống nước không?"
     }
    ]
   },
   {
    "title": "Thời tiết & thiên nhiên (Weather and Nature)",
    "topic": "weather",
    "emoji": "🌤️",
    "items": [
     {
      "en": "weather",
      "vi": "thời tiết",
      "emoji": "🌤️"
     },
     {
      "en": "sunny",
      "vi": "có nắng",
      "emoji": "☀️"
     },
     {
      "en": "rainy",
      "vi": "có mưa",
      "emoji": "🌧️"
     },
     {
      "en": "windy",
      "vi": "có gió",
      "emoji": "🌬️"
     },
     {
      "en": "cloudy",
      "vi": "có mây",
      "emoji": "☁️"
     },
     {
      "en": "stormy",
      "vi": "có bão",
      "emoji": "⛈️"
     },
     {
      "en": "snowy",
      "vi": "có tuyết",
      "emoji": "❄️"
     },
     {
      "en": "hot",
      "vi": "nóng",
      "emoji": "🥵"
     }
    ],
    "phrases": [
     {
      "en": "What is the weather like today?",
      "vi": "hôm nay thời tiết thế nào?"
     },
     {
      "en": "It is sunny and hot.",
      "vi": "trời nắng và nóng."
     },
     {
      "en": "What will the weather be like tomorrow?",
      "vi": "ngày mai thời tiết sẽ thế nào?"
     }
    ]
   }
  ]
 }
];
