// Format: [savol, [A, B, C, D], to'g'ri javob indeksi]
export const SECTIONS = [
  {
    id: "html", title: "HTML / CSS", icon: "🎨", desc: "Teglar, selektorlar, flex, joylashuv", grad: "from-orange-700 to-pink-500",
    qs: [
      ["HTMLda eng katta sarlavha qaysi teg bilan yoziladi?", ["<h6>", "<h1>", "<head>", "<title>"], 1],
      ["Havola (link) yaratish uchun qaysi teg ishlatiladi?", ["<link>", "<a>", "<href>", "<url>"], 1],
      ["CSSda matn rangini o'zgartiruvchi xossa qaysi?", ["font-color", "text-color", "color", "fg-color"], 2],
      ["Flexbox'ni yoqish uchun qaysi yozuv to'g'ri?", ["display: flex", "flex: on", "position: flex", "layout: flex"], 0],
      ["Elementning tashqi bo'shlig'ini qaysi xossa belgilaydi?", ["padding", "margin", "border", "gap"], 1],
      ["CSSda id selektori qaysi belgi bilan boshlanadi?", [".", "#", "*", "&"], 1],
      ["Rasm yuklanmaganda ko'rsatiladigan matn qaysi atributda yoziladi?", ["title", "src", "alt", "caption"], 2],
      ["position: absolute berilgan element nimaga nisbatan joylashadi?", ["Doim body'ga", "Position berilgan eng yaqin ota elementga", "Ekran markaziga", "Keyingi elementga"], 1],
      ["Quyidagilardan qaysi biri semantik teg hisoblanadi?", ["<div>", "<span>", "<article>", "<b>"], 2],
      ["Moslashuvchan (responsive) dizayn uchun qaysi CSS qoidasi ishlatiladi?", ["@media", "@screen-size", "@responsive", "@query"], 0],
    ]
  },
  {
    id: "js", title: "JavaScript", icon: "⚡", desc: "Asoslar, massivlar, async, closure", grad: "from-orange-700 to-yellow-600",
    qs: [
      ["Qiymati o'zgarmaydigan o'zgaruvchi qaysi kalit so'z bilan e'lon qilinadi?", ["var", "let", "const", "static"], 2],
      ["typeof null ifodasi qanday natija qaytaradi?", ["\"null\"", "\"object\"", "\"undefined\"", "\"number\""], 1],
      ["Massivning oxiriga element qo'shadigan metod qaysi?", ["push()", "pop()", "shift()", "unshift()"], 0],
      ["\"5\" + 2 ifodasining natijasi nima?", ["7", "\"52\"", "NaN", "Xatolik"], 1],
      ["Qiymat va turni birga solishtiradigan operator qaysi?", ["=", "==", "===", "=>"], 2],
      ["Massivning har bir elementini o'zgartirib, yangi massiv qaytaradigan metod?", ["forEach", "map", "push", "splice"], 1],
      ["Promise natijasini kutish uchun qaysi kalit so'z ishlatiladi?", ["wait", "pause", "await", "sleep"], 2],
      ["Obyektni JSON satriga aylantiradigan metod qaysi?", ["JSON.parse()", "JSON.stringify()", "JSON.toString()", "JSON.text()"], 1],
      ["Quyidagilardan qaysi biri to'g'ri arrow function?", ["function => {}", "() => {}", "=> function()", "func() -> {}"], 1],
      ["Closure nima?", ["Funksiya o'zi yaratilgan tashqi o'zgaruvchilarni eslab qoladi", "Funksiyani o'chirish usuli", "Sikl turi", "Xatolarni ushlash bloki"], 0],
    ]
  },
  {
    id: "react", title: "React va ekotizim", icon: "⚛️", desc: "Hooks, TypeScript, Next.js, Zustand", grad: "from-purple-400 to-blue-500",
    qs: [
      ["Funksional komponentda holatni saqlash uchun qaysi hook ishlatiladi?", ["useEffect", "useState", "useRef", "useMemo"], 1],
      ["Ro'yxatni render qilishda har bir elementga qaysi atribut berilishi kerak?", ["id", "key", "index", "ref"], 1],
      ["useEffect ikkinchi argumenti sifatida bo'sh massiv [] berilsa nima bo'ladi?", ["Har renderda ishlaydi", "Faqat birinchi renderdan keyin bir marta ishlaydi", "Umuman ishlamaydi", "Faqat komponent o'chganda ishlaydi"], 1],
      ["Next.js'dagi SSR nimani anglatadi?", ["Sahifani serverda render qilish", "Stilni avtomatik yuklash", "Faqat statik rasmlar bilan ishlash", "Ma'lumotlar bazasini ulash"], 0],
      ["Zustand nima?", ["Yengil state management kutubxonasi", "CSS framework", "Test yozish vositasi", "Routing kutubxonasi"], 0],
      ["TypeScript'da interface nima uchun ishlatiladi?", ["Obyekt shaklini (turini) tavsiflash uchun", "Funksiyani chaqirish uchun", "Modul import qilish uchun", "Stil berish uchun"], 0],
      ["React'da props nima?", ["Komponentga tashqaridan uzatiladigan ma'lumotlar", "Komponentning ichki holati", "Hook turi", "CSS sinfi"], 0],
      ["Next.js App Router'da sahifa qaysi fayl orqali yaratiladi?", ["index.html", "page.tsx", "main.tsx", "route.css"], 1],
      ["useMemo hooki nima uchun kerak?", ["Holat yaratish uchun", "DOM elementga kirish uchun", "Qimmat hisob-kitob natijasini keshlash uchun", "Marshrutlash uchun"], 2],
      ["React hook'larini qayerda chaqirish to'g'ri?", ["Shartli operator ichida", "Komponent yoki custom hook'ning yuqori darajasida", "Sikl ichida", "Oddiy funksiya ichida"], 1],
    ]
  },
  {
    id: "git", title: "Git va Web asoslari", icon: "🌐", desc: "Git, HTTP, API, npm", grad: "from-emerald-700 to-teal-500",
    qs: [
      ["Yangi Git repozitoriyni boshlash buyrug'i qaysi?", ["git start", "git init", "git new", "git create"], 1],
      ["O'zgarishlarni Git'da saqlash (snapshot) buyrug'i qaysi?", ["git push", "git commit", "git pull", "git clone"], 1],
      ["HTTP 404 holat kodi nimani bildiradi?", ["Server xatosi", "Sahifa topilmadi", "Ruxsat yo'q", "Muvaffaqiyatli bajarildi"], 1],
      ["Serverdan ma'lumot olish uchun odatda qaysi HTTP metod ishlatiladi?", ["POST", "GET", "PUT", "DELETE"], 1],
      ["API nima?", ["Dasturlar o'zaro aloqa qilishi uchun interfeys", "Dasturlash tili", "Brauzer turi", "Dizayn vositasi"], 0],
      ["HTTPS'dagi \"S\" harfi nimani bildiradi?", ["Speed", "Secure", "Server", "Static"], 1],
      ["DNS tizimining vazifasi nima?", ["Domen nomini IP manzilga aylantirish", "Fayllarni siqish", "Virusni topish", "Rasmlarni tahrirlash"], 0],
      ["npm nima?", ["Paketlarni boshqarish vositasi", "Brauzer", "Ma'lumotlar bazasi", "Dasturlash tili"], 0],
      ["Git'da branch (shox) nima uchun kerak?", ["Faylni o'chirish uchun", "Serverga yuklash uchun", "Alohida ishlash chizig'ini yaratish uchun", "Parolni o'zgartirish uchun"], 2],
      ["JSON nima?", ["Ma'lumot almashish formati", "Dasturlash tili", "CSS kutubxonasi", "Brauzer"], 0],
    ]
  },
  {
    id: "pc", title: "Kompyuter savodxonligi", icon: "💻", desc: "Qurilmalar, dasturlar, xavfsizlik", grad: "from-blue-500 to-darkblue-500",
    qs: [
      ["RAM nima?", ["Doimiy xotira", "Tezkor (operativ) xotira", "Videokarta", "Protsessor"], 1],
      ["Nusxa olish uchun qaysi tugmalar birikmasi ishlatiladi?", ["Ctrl+X", "Ctrl+V", "Ctrl+C", "Ctrl+Z"], 2],
      ["Quyidagilardan qaysi biri operatsion tizim?", ["Microsoft Word", "Windows", "Google Chrome", "Photoshop"], 1],
      ["1 bayt necha bitga teng?", ["4", "8", "16", "10"], 1],
      ["Qaysi kengaytma rasm faylini bildiradi?", [".docx", ".mp3", ".jpg", ".exe"], 2],
      ["Quyidagilardan qaysi biri brauzer?", ["Google Chrome", "Excel", "Notepad", "WinRAR"], 0],
      ["Ctrl+Z tugmalar birikmasi nima qiladi?", ["Oxirgi amalni bekor qiladi", "Faylni saqlaydi", "Chop etadi", "Hammasini belgilaydi"], 0],
      ["Quyidagilardan qaysi biri kiritish qurilmasi?", ["Printer", "Klaviatura", "Monitor", "Karnay"], 1],
      ["Microsoft Excel qanday dastur?", ["Matn muharriri", "Elektron jadval dasturi", "Taqdimot dasturi", "Brauzer"], 1],
      ["SSD nima?", ["Ma'lumotlarni saqlash qurilmasi", "Protsessor sovutgichi", "Tarmoq kabeli", "Ekran turi"], 0],
      ["Wi-Fi nima?", ["Simsiz tarmoq texnologiyasi", "Fayl formati", "Antivirus dasturi", "Xotira turi"], 0],
      ["Fishing (phishing) hujumi nima?", ["Internet tezligini oshirish", "Aldov yo'li bilan shaxsiy ma'lumotlarni o'g'irlash", "Fayllarni siqish", "Rasm tahrirlash"], 1],
      ["Quyidagilardan qaysi biri eng kuchli parol?", ["12345678", "qwerty", "Tz7$kP!9mQ2x", "ismim2000"], 2],
      ["PDF nima?", ["Hujjat formati", "Audio format", "Dasturlash tili", "Operatsion tizim"], 0],
      ["Quyidagi o'lchov birliklaridan qaysi biri eng katta?", ["KB", "MB", "GB", "TB"], 3],
      ["Antivirus dasturi nima uchun kerak?", ["Internetni tezlashtirish uchun", "Rasm chizish uchun", "Zararli dasturlardan himoya qilish uchun", "Fayllarni nusxalash uchun"], 2],
      ["Elektron pochta manzilida qaysi belgi majburiy?", ["#", "@", "$", "&"], 1],
      ["Word'da matnni qalin qilish uchun qaysi tugmalar ishlatiladi?", ["Ctrl+I", "Ctrl+U", "Ctrl+B", "Ctrl+K"], 2],
      ["Windows'da fayl va papkalarni boshqarish dasturi qaysi?", ["File Explorer", "Paint", "Calculator", "Media Player"], 0],
      ["Quyidagilardan qaysi biri bulutli saqlash xizmati?", ["Google Drive", "Paint", "Notepad", "Calculator"], 0],
    ]
  },
];
