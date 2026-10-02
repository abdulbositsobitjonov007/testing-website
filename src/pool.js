import { SECTIONS } from "./data";
import { RU } from "./ru";

export const PICK = 20; // har bir bo'limdan nechta tasodifiy savol beriladi
const rnd = (a) => [...a].sort(() => Math.random() - 0.5);

// Atama → vazifa juftliklari: [atama, uz, ru, (ru atama)]. Noto'g'ri variantlar boshqa juftliklardan olinadi.
const G = {
  html: { q: [(t) => `${t} nima uchun ishlatiladi?`, (t) => `Для чего используется ${t}?`], p: [
    ["<ul>", "Markerli ro'yxat yaratish", "Создание маркированного списка"],
    ["<ol>", "Raqamlangan ro'yxat yaratish", "Создание нумерованного списка"],
    ["<form>", "Ma'lumot kiritish shaklini yaratish", "Создание формы ввода данных"],
    ["<table>", "Jadval yaratish", "Создание таблицы"],
    ["<br>", "Yangi qatorga o'tish", "Перенос строки"],
    ["<button>", "Bosiladigan tugma yaratish", "Создание кнопки"],
    ["<input>", "Foydalanuvchidan qiymat qabul qilish", "Получение значения от пользователя"],
    ["<nav>", "Navigatsiya havolalari bloki", "Блок навигационных ссылок"],
    ["<footer>", "Sahifa yoki bo'limning pastki qismi", "Нижняя часть страницы или раздела"],
    ["<video>", "Video fayl joylashtirish", "Вставка видеофайла"],
    ["z-index", "Elementlarning qatlam tartibini belgilash", "Задание порядка наложения элементов"],
    ["border-radius", "Burchaklarni yumaloqlash", "Скругление углов"],
    ["opacity", "Shaffoflik darajasini belgilash", "Задание степени прозрачности"],
    ["gap", "Flex/Grid elementlari orasidagi masofa", "Расстояние между элементами flex/grid"],
    ["overflow: hidden", "Sig'may qolgan qismni yashirish", "Скрытие не поместившейся части"],
    ["font-size", "Matn o'lchamini belgilash", "Задание размера текста"],
    ["display: none", "Elementni sahifadan butunlay yashirish", "Полное скрытие элемента со страницы"],
    ["display: grid", "Elementlarni setka (grid) ko'rinishida joylash", "Размещение элементов в виде сетки"],
    ["<meta viewport>", "Mobil qurilmalarda sahifa o'lchamini moslash", "Настройка масштаба страницы на мобильных"],
    ["<label>", "Forma maydoni uchun yorliq (nom) yozish", "Подпись для поля формы"],
  ] },
  js: { q: [(t) => `${t} nima qiladi yoki nima uchun kerak?`, (t) => `Что делает или для чего нужен ${t}?`], p: [
    ["arr.pop()", "Massivning oxirgi elementini o'chirish", "Удаление последнего элемента массива"],
    ["arr.filter()", "Shartga mos elementlardan yangi massiv olish", "Получение нового массива из элементов, подходящих под условие"],
    ["arr.reduce()", "Massivni bitta qiymatga jamlash", "Свёртка массива в одно значение"],
    ["arr.includes()", "Massivda element borligini tekshirish", "Проверка наличия элемента в массиве"],
    ["arr.join()", "Massiv elementlarini satrga birlashtirish", "Объединение элементов массива в строку"],
    ["arr.slice()", "Massivning bir qismidan nusxa olish", "Копирование части массива"],
    ["str.split()", "Satrni massivga ajratish", "Разбиение строки на массив"],
    ["parseInt()", "Satrni butun songa aylantirish", "Преобразование строки в целое число"],
    ["setTimeout()", "Funksiyani ma'lum vaqtdan keyin bajarish", "Выполнение функции через заданное время"],
    ["setInterval()", "Funksiyani oraliq bilan takroran bajarish", "Периодическое повторение функции"],
    ["addEventListener()", "Elementga hodisa tinglovchisini qo'shish", "Добавление обработчика события элементу"],
    ["try...catch", "Xatoliklarni ushlab qolish", "Перехват ошибок"],
    ["Object.keys()", "Obyekt kalitlari massivini olish", "Получение массива ключей объекта"],
    ["fetch()", "Tarmoq orqali so'rov yuborish", "Отправка сетевого запроса"],
    ["...spread", "Massiv yoki obyektni yoyib yozish", "Разворачивание массива или объекта"],
    ["localStorage", "Ma'lumotni brauzerda doimiy saqlash", "Постоянное хранение данных в браузере"],
    ["Array.isArray()", "Qiymat massiv ekanini tekshirish", "Проверка, является ли значение массивом"],
    ["NaN", "\"Son emas\" (Not a Number) qiymati", "Значение «не число» (Not a Number)"],
    ["querySelector()", "CSS selektor bo'yicha elementni topish", "Поиск элемента по CSS-селектору"],
    ["Math.random()", "0 va 1 orasidagi tasodifiy son olish", "Получение случайного числа от 0 до 1"],
  ] },
  react: { q: [(t) => `${t} nima uchun kerak?`, (t) => `Для чего нужен ${t}?`], p: [
    ["useRef", "DOM elementga yoki qiymatga renderlar orasida murojaat saqlash", "Хранение ссылки на DOM-элемент или значения между рендерами"],
    ["useContext", "Context qiymatini o'qish", "Чтение значения контекста"],
    ["useReducer", "Murakkab holatni reducer orqali boshqarish", "Управление сложным состоянием через reducer"],
    ["useCallback", "Funksiyani keshlab, qayta yaratilishining oldini olish", "Кеширование функции, чтобы она не пересоздавалась"],
    ["React.memo", "Props o'zgarmasa komponent qayta renderini oldini olish", "Предотвращение ререндера при неизменных props"],
    ["Fragment (<></>)", "Qo'shimcha DOM elementsiz bir nechta elementni guruhlash", "Группировка элементов без лишнего DOM-узла"],
    ["next/link", "Sahifalar orasida tezkor (klient) o'tish", "Быстрый клиентский переход между страницами"],
    ["next/image", "Rasmlarni avtomatik optimallashtirish", "Автоматическая оптимизация изображений"],
    ["'use client'", "Komponentni klient tomonda ishlaydigan deb belgilash", "Пометка компонента как клиентского"],
    ["useEffect cleanup", "Effekt tugaganda obuna va taymerlarni tozalash", "Очистка подписок и таймеров при завершении эффекта"],
    ["Generic <T> (TypeScript)", "Turga bog'liq bo'lmagan, qayta ishlatiladigan kod yozish", "Написание переиспользуемого кода, не зависящего от типа"],
    ["Union (|) turi (TypeScript)", "O'zgaruvchiga bir nechta turdan birini ruxsat berish", "Допуск для переменной одного из нескольких типов"],
    ["Virtual DOM", "O'zgarishlarni DOM'ga samarali qo'llash uchun xotiradagi nusxa", "Копия в памяти для эффективного применения изменений к DOM"],
    ["children prop", "Komponent ichiga joylangan tarkibni olish", "Получение содержимого, вложенного в компонент"],
    ["Controlled component", "Qiymati React holati orqali boshqariladigan forma elementi", "Элемент формы, значением которого управляет состояние React"],
    ["create() (Zustand)", "Global store yaratish", "Создание глобального хранилища"],
    ["React.lazy", "Komponentni kerak bo'lganda yuklash (lazy loading)", "Ленивая загрузка компонента по необходимости"],
    ["layout.tsx (Next.js)", "Sahifalar uchun umumiy o'rama (maket)", "Общая обёртка (макет) для страниц"],
    ["Server Component (Next.js)", "Serverda render bo'ladigan komponent", "Компонент, рендерящийся на сервере"],
    ["Error Boundary", "Bola komponentlardagi xatoni ushlab, zaxira UI ko'rsatish", "Перехват ошибок дочерних компонентов и показ запасного UI"],
  ] },
  git: { q: [(t) => `${t} nima qiladi yoki nimani anglatadi?`, (t) => `Что делает или что означает ${t}?`], p: [
    ["git pull", "Masofaviy o'zgarishlarni olib, birlashtirish", "Получение и слияние изменений с удалённого репозитория"],
    ["git push", "Mahalliy commitlarni masofaviy repozitoriyga yuborish", "Отправка локальных коммитов в удалённый репозиторий"],
    ["git clone", "Masofaviy repozitoriydan nusxa olish", "Копирование удалённого репозитория"],
    ["git status", "Fayllarning joriy holatini ko'rsatish", "Показ текущего состояния файлов"],
    ["git merge", "Bir shoxni boshqasiga birlashtirish", "Слияние одной ветки в другую"],
    ["git add", "Fayllarni commit uchun tayyorlash (staging)", "Подготовка файлов к коммиту (staging)"],
    ["git log", "Commitlar tarixini ko'rsatish", "Показ истории коммитов"],
    ["git stash", "O'zgarishlarni vaqtincha chetga olib qo'yish", "Временное откладывание изменений"],
    ["git checkout -b", "Yangi shox yaratib, unga o'tish", "Создание новой ветки и переход на неё"],
    [".gitignore", "Git kuzatmaydigan fayllar ro'yxati", "Список файлов, которые Git не отслеживает"],
    ["HTTP 200", "So'rov muvaffaqiyatli bajarildi", "Запрос выполнен успешно"],
    ["HTTP 500", "Serverda ichki xatolik", "Внутренняя ошибка сервера"],
    ["HTTP 403", "Kirish taqiqlangan", "Доступ запрещён"],
    ["HTTP 301", "Doimiy yo'naltirish", "Постоянное перенаправление"],
    ["POST metodi", "Serverga yangi ma'lumot yuborish", "Отправка новых данных на сервер", "метод POST"],
    ["DELETE metodi", "Serverdagi resursni o'chirish", "Удаление ресурса на сервере", "метод DELETE"],
    ["localhost", "O'z kompyuteringizdagi mahalliy server manzili", "Адрес локального сервера на вашем компьютере"],
    ["package.json", "Loyiha va bog'liqliklar haqidagi fayl", "Файл с информацией о проекте и зависимостях"],
    ["yarn add", "Loyihaga yangi paket qo'shish", "Добавление нового пакета в проект"],
    ["Pull Request", "Kodni ko'rib chiqish va birlashtirish so'rovi", "Запрос на проверку и слияние кода"],
  ] },
  pc: { q: [(t) => `${t} nima uchun kerak?`, (t) => `Для чего нужен(а) ${t}?`], p: [
    ["Ctrl+S", "Faylni saqlash", "Сохранение файла"],
    ["Ctrl+A", "Hammasini belgilash", "Выделение всего"],
    ["Ctrl+V", "Nusxani joylashtirish (qo'yish)", "Вставка скопированного"],
    ["Alt+Tab", "Ochiq oynalar orasida almashish", "Переключение между открытыми окнами"],
    ["Task Manager", "Ishlayotgan dasturlarni ko'rish va yopish", "Просмотр и завершение запущенных программ"],
    ["Savat (Recycle Bin)", "O'chirilgan fayllarni vaqtincha saqlash", "Временное хранение удалённых файлов", "Корзина"],
    ["GPU (videokarta)", "Grafika va tasvirni qayta ishlash", "Обработка графики и изображения", "GPU (видеокарта)"],
    ["USB-port", "Tashqi qurilmalarni ulash", "Подключение внешних устройств", "USB-порт"],
    ["Zaxira nusxa (backup)", "Ma'lumot yo'qolishidan saqlanish uchun nusxa olish", "Копирование данных для защиты от потери", "Резервная копия (backup)"],
    ["Skrinshot", "Ekran tasvirini rasm qilib olish", "Снимок экрана в виде изображения", "Скриншот"],
  ] },
};

const pool = (id) => {
  const s = SECTIONS.find((x) => x.id === id), g = G[id];
  const base = s.qs.map(([q, o, a], j) => {
    const [rq, ro] = RU[id][j];
    return { q: { uz: q, ru: rq }, o: o.map((x, k) => ({ uz: x, ru: ro ? ro[k] : x })), a };
  });
  const gen = g.p.map((p) => ({
    q: { uz: g.q[0](p[0]), ru: g.q[1](p[3] || p[0]) },
    o: [p, ...rnd(g.p.filter((x) => x !== p)).slice(0, 3)].map((x) => ({ uz: x[1], ru: x[2] })),
    a: 0,
  }));
  return [...base, ...gen];
};

// Har bir bo'limdan PICK ta tasodifiy savol; variantlar ham aralashtiriladi
export const draw = (ids) =>
  ids.flatMap((id) =>
    rnd(pool(id)).slice(0, PICK).map((it) => {
      const ord = rnd([0, 1, 2, 3]);
      return { sec: id, q: it.q, o: ord.map((i) => it.o[i]), a: ord.indexOf(it.a) };
    })
  );
