"use strict";

// Ссылки хранятся в одном месте, номера совпадают со ссылками в index.html.
const sources = [
  ["climate", "NOAA", "The Ocean", "Год не указан; проверено 01.10.2026", "https://www.noaa.gov/jetstream/ocean"],
  ["unep", "UNEP", "From Pollution to Solution: A global assessment of marine litter and plastic pollution", "2021", "https://www.unep.org/resources/pollution-solution-global-assessment-marine-litter-and-plastic-pollution"],
  ["study", "Lebreton et al. · Scientific Reports", "Evidence that the Great Pacific Garbage Patch is rapidly accumulating plastic", "2018 · полевые данные 2015–2016 · DOI: 10.1038/s41598-018-22939-w", "https://www.nature.com/articles/s41598-018-22939-w"],
  ["patch", "NOAA Marine Debris Program", "Garbage Patches", "Год не указан; проверено 01.10.2026", "https://marinedebris.noaa.gov/discover-marine-debris/garbage-patches"],
  ["who", "WHO / ВОЗ", "Dietary and inhalation exposure to nano- and microplastic particles and potential implications for human health", "2022 · обзор данных по декабрь 2021", "https://www.who.int/publications/i/item/9789240054608"],
  ["nutrients", "NOAA", "What is nutrient pollution?", "Обновлено 2024", "https://oceanservice.noaa.gov/facts/nutpollution.html"],
  ["spills", "NOAA", "Oil and Chemical Spills", "Год не указан; проверено 01.10.2026", "https://oceanservice.noaa.gov/hazards/spills/"],
  ["runoff", "US EPA", "Urbanization and Stormwater Runoff", "Год не указан; проверено 01.10.2026", "https://www.epa.gov/sourcewaterprotection/urbanization-and-stormwater-runoff"],
  ["wastewater", "UNEP / GRID-Arendal", "Wastewater — Turning Problem to Solution", "2023", "https://www.unep.org/resources/report/wastewater-turning-problem-solution"],
  ["tap", "UNEP", "Turning off the Tap: How the world can end plastic pollution and create a circular economy", "2023", "https://www.unep.org/resources/turning-off-tap-end-plastic-pollution-create-circular-economy"],
  ["capture", "US EPA", "Trash Stormwater Permit Compendium", "2021", "https://www.epa.gov/trash-free-waters/trash-stormwater-permit-compendium"],
  ["micro-water", "UNEP", "Microplastics in wastewater: towards solutions", "2020", "https://www.unep.org/news-and-stories/story/microplastics-wastewater-towards-solutions"]
];
const sourceNotes = [
  "Площадь океана и его роль в обмене теплом с атмосферой.",
  "Доля пластика в морском мусоре, источники и экологические последствия.",
  "Площадь и состав тихоокеанского пятна; различие количества и массы частиц.",
  "Расположение пятен, роль течений и объяснение, почему это не острова.",
  "Ограничения данных о воздействии микро- и нанопластика на здоровье.",
  "Азот, фосфор, рост водорослей и расход кислорода при разложении.",
  "Нефтяные и химические разливы, ущерб побережьям и экономике.",
  "Перенос мусора и химических примесей поверхностным стоком.",
  "Загрязнение сточными водами и необходимость их очистки.",
  "Сокращение ненужного пластика, повторное использование и системные меры.",
  "Реальные подходы к перехвату мусора в ливневых системах.",
  "Работа с микропластиком в стоках и безопасное обращение с осадком."
];
document.querySelector("#source-list").innerHTML = sources.map(([id, org, title, year, url], i) =>
  `<li id="src-${id}"><span class="source-org">${org}</span><h3>${title}</h3><small>${year}</small><p>${sourceNotes[i]}</p><a href="${url}" target="_blank" rel="noopener noreferrer">Открыть источник ↗</a></li>`).join("");

// Компактные SVG без внешних библиотек; декоративные иконки скрыты от скринридера.
const iconPaths = [
  '<path d="M9 3h6m-5 0v5l-4 5v7h12v-7l-4-5V3M7 14h10"/>',
  '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="15" r="4"/><circle cx="6" cy="18" r="1"/>',
  '<path d="M12 3C9 8 5 12 5 16a7 7 0 0 0 14 0c0-4-4-8-7-13Z"/>',
  '<path d="M9 3h6m-5 0v7L4 20h16l-6-10V3M7 15h10"/>',
  '<path d="M3 8h12V4h5v10h-9v6H6v-7H3M14 18l2 3 2-3"/>',
  '<path d="M12 21V8M12 14C4 14 3 7 3 4c6 0 9 4 9 10ZM12 18c8 0 9-7 9-10-6 0-9 4-9 10Z"/>'
];
function icon(index) {
  return `<svg class="line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[index % iconPaths.length]}</svg>`;
}

const pollution = [
  ["01 / PLASTIC", "Пластиковые отходы", "Упаковка, одноразовые изделия и потерянные снасти становятся мусором, если их не собирают или теряют в море.", ["Потребление и рыболовство", "Сток, реки или потеря снастей в море", "Проглатывание и запутывание", "Травмы животных, повреждение местообитаний"], "unep", 2],
  ["02 / MICROPLASTICS", "Микропластик", "Частицы пластика размером менее 5 мм: в том числе фрагменты крупных изделий и волокна синтетических тканей. Они рассеиваются, поэтому их трудно извлечь без захвата живых организмов.", ["Износ изделий, стирка, разрушение мусора", "Стоки и перенос водой", "Контакт с организмами и проглатывание", "Сохранение частиц в среде; риски зависят от условий"], "micro-water", 12],
  ["03 / OIL", "Нефть и нефтепродукты", "Источники включают аварии при добыче и перевозке, судоходство и смыв нефтепродуктов с городской территории.", ["Транспорт, добыча, топливо", "Разливы и загрязнённый сток", "Обволакивание и токсическое действие", "Ущерб животным, промыслам и побережьям"], "spills", 7],
  ["04 / CHEMICALS", "Химическое загрязнение", "Промышленные вещества, пестициды и тяжёлые металлы попадают в воду со сбросами и стоком. Их поведение и опасность различаются.", ["Промышленность, применение химикатов", "Сбросы и поверхностный сток", "Токсическое действие при достаточной дозе", "Ухудшение состояния экосистем и ресурсов"], "wastewater", 9],
  ["05 / WASTEWATER", "Сточные воды", "Недостаточно очищенные городские и промышленные стоки могут переносить органику, биогенные вещества, микроорганизмы и химические примеси.", ["Быт и производство", "Канализационные выпуски в водоёмы", "Органическая и химическая нагрузка", "Ухудшение качества воды, экологические риски"], "wastewater", 9],
  ["06 / AGRICULTURE", "Сельское хозяйство", "Дожди смывают избыток азота и фосфора с удобренных полей. Обогащение воды биогенными веществами вызывает эвтрофикацию.", ["Удобрения и животноводство", "Сток с полей → реки → море", "Избыточный рост водорослей", "Разложение органики, расход кислорода, гипоксия"], "nutrients", 6]
];
const labels = ["Источник", "Попадание в океан", "Воздействие", "Последствия"];
document.querySelector("#pollution-cards").innerHTML = pollution.map(([type, title, text, chain, source, number], i) =>
  `<details class="card pollution-card"><summary>${icon(i)}<span class="type">${type}</span><h3>${title}</h3></summary><div class="pollution-body"><p>${text}</p><ol class="mini-chain">${chain.map((value, i) => `<li><b>${labels[i]} ${i < 3 ? "↓" : ""}</b>${value}</li>`).join("")}</ol><a href="#src-${source}">Источник [${number}]</a>${number === 12 ? ' · <a href="https://oceanservice.noaa.gov/facts/microplastics.html" target="_blank" rel="noopener noreferrer">Определение NOAA (проверено 01.10.2026)</a>' : ""}</div></details>`).join("");

// Каждый этап: заголовок, пояснение, необязательный идентификатор источника.
const diagrams = {
  route: [
    ["Человек / промышленность", "Производство и потребление создают отходы. Риск утечки растёт там, где сбор и вывоз не справляются.", "unep"],
    ["Улицы и свалки", "Открытый мусор может переноситься ветром и водой. Правильно организованное хранение помогает не допустить утечки.", "runoff"],
    ["Дождь и канализация", "Поверхностный сток подхватывает мусор и химические примеси. Ливневая и бытовая канализация могут быть раздельными; не каждый сток проходит очистку.", "runoff"],
    ["Реки", "Река переносит загрязнения вниз по течению. Часть отходов задерживается на берегах или оседает; часть движется дальше.", "unep"],
    ["Море", "В прибрежной зоне встречаются речной сток и прямые морские источники, включая потерянные сети.", "study"],
    ["Мировой океан", "Течения и ветер распространяют плавучие отходы. В некоторых районах циркуляция способствует их накоплению.", "study"]
  ],
  chain: [
    ["Мусор", "Крупные отходы уже опасны: в них можно запутаться или проглотить их. Не весь мусор превращается в микропластик — это относится к пластиковым материалам.", "unep"],
    ["Микропластик / вещества", "Пластик дробится на мелкие частицы. Химическое загрязнение может поступать отдельно, например со стоками; не любой фрагмент обязательно выделяет опасную дозу вещества.", "micro-water"],
    ["Морские организмы", "Организмы могут проглатывать частицы или контактировать с загрязнённой водой. Эффект зависит от вида, размера частиц, вещества и уровня воздействия.", "unep"],
    ["Пищевая цепь", "Часть загрязнителей может передаваться с пищей. Нельзя автоматически приписывать всем частицам микропластика усиление концентрации на каждом уровне цепи.", "who"],
    ["Человек и экономика", "Загрязнение влияет на морские ресурсы и доходы. Риски микропластика для здоровья ещё исследуют; наличие частиц не равно доказанному заболеванию.", "who"]
  ],
  guard: [
    ["Город", "Начинаем с инвентаризации источников: предприятия, улицы, выпуски и места накопления мусора. Для каждого участка назначаем ответственных."],
    ["Сортировка отходов", "Сокращение одноразовых изделий и сбор по местным правилам. Отсортированные отходы направляем на обработку, а не в водную систему.", "tap"],
    ["Ливневая сеть / река", "Определяем места утечки и подходящие точки перехвата. Проверяем паводковый расход, безопасность людей и водных организмов.", "capture"],
    ["Перехват мусора", "Решётки, корзины или плавучие барьеры задерживают подходящие по размеру отходы. Предусматриваем регулярное обслуживание и вывоз.", "capture"],
    ["Очистные сооружения", "Это отдельная ветвь для сточных вод. Подбираем очистку под состав стоков; извлечённые загрязнения и осадок требуют дальнейшего обращения.", "micro-water"],
    ["Мониторинг", "В проекте сравниваем пробы до и после вмешательства, фиксируем расход воды и погоду. Сигнал датчика проверяет специалист; лаборатория уточняет состав."],
    ["Море", "В море должно поступать меньше новых загрязнений. Уже накопившийся мусор потребует отдельных мер.", "tap"]
  ]
};
function sourceLink(id) {
  const number = sources.findIndex(source => source[0] === id) + 1;
  return id ? ` <a href="#src-${id}">Источник [${number}]</a>` : "";
}
document.querySelectorAll("[data-diagram]").forEach((container) => {
  const name = container.dataset.diagram;
  const steps = diagrams[name];
  container.innerHTML = `<div class="diagram-steps" role="group" aria-label="Этапы схемы">${steps.map(([title], i) => `<button class="step" type="button" aria-pressed="${i === 0}" aria-controls="info-${name}"><span>${String(i + 1).padStart(2, "0")}</span>${title}</button>`).join("")}</div><div id="info-${name}" class="diagram-info" aria-live="polite"></div>`;
  const buttons = [...container.querySelectorAll("button")];
  const show = (i) => {
    buttons.forEach((button, j) => button.setAttribute("aria-pressed", String(i === j)));
    container.querySelector(".diagram-info").innerHTML = `<h3>${steps[i][0]}</h3><p>${steps[i][1]}${sourceLink(steps[i][2])}</p>`;
  };
  buttons.forEach((button, i) => {
    button.addEventListener("click", () => show(i));
    button.addEventListener("focus", () => show(i));
    if (name === "route") button.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") show(i);
    });
  });
  show(0);
});

// Чек-лист работает и при запрете localStorage (например, в некоторых file:// браузерах).
const checks = [...document.querySelectorAll('.checklist input')];
try {
  const saved = JSON.parse(localStorage.getItem("ocean-guard-checks") || "[]");
  if (Array.isArray(saved)) checks.forEach((input, i) => { input.checked = saved[i] === true; });
} catch { /* Хранилище недоступно: остаётся сохранение в текущей вкладке. */ }
function updateContribution() {
  const count = checks.filter(input => input.checked).length;
  document.querySelector("#contribution").textContent = `Ваш экологический вклад: ${count} из 7`;
  document.querySelector("#eco-progress").value = count;
}
checks.forEach(input => input.addEventListener("change", () => {
  updateContribution();
  try { localStorage.setItem("ocean-guard-checks", JSON.stringify(checks.map(item => item.checked))); } catch { /* Не мешаем работе чек-листа. */ }
}));
updateContribution();

const questions = [
  ["В океане существует сплошной остров из пластика.", false, "Мусорное пятно — неоднородная область повышенной концентрации отходов, а не твёрдая поверхность.", "patch"],
  ["Реки и океанические течения могут переносить загрязнение далеко от его источника.", true, "Реки доставляют часть отходов к морю, а течения перемещают плавучие частицы и способствуют их накоплению в определённых районах.", "study"],
  ["Микропластик легко полностью удалить из океана.", false, "Мелкие частицы рассеяны в огромном объёме воды. Предотвращение поступлений и работа со стоками необходимы; простой полной очистки нет.", "micro-water"],
  ["Недостаточно очищенные сточные воды могут загрязнять моря.", true, "Стоки способны переносить органику, биогенные вещества и химические примеси. Нужны очистка и контроль сбросов.", "wastewater"],
  ["Одних речных ловушек достаточно, чтобы решить все виды загрязнения океана.", false, "Перехват крупных отходов не заменяет сокращение отходов и очистку сточных вод. Требуется сочетание мер.", "tap"]
];
let questionIndex = 0;
let score = 0;
const quiz = document.querySelector("#quiz-content");
function renderQuiz(focus = false) {
  if (questionIndex === questions.length) {
    quiz.innerHTML = `<p class="eyebrow">Проверка завершена</p><h3 tabindex="-1">Ваш результат: ${score} / 5</h3><p>${score === 5 ? "Все пять ответов верны." : "Можно повторить материал и пройти тест ещё раз."}</p><button class="button" type="button">Пройти ещё раз ↻</button>`;
    quiz.querySelector("button").addEventListener("click", () => { questionIndex = 0; score = 0; renderQuiz(true); });
  } else {
    const [text, correct, explanation, source] = questions[questionIndex];
    quiz.innerHTML = `<div class="quiz-meta"><span>ВОПРОС ${questionIndex + 1} / 5</span><span>Верных ответов: ${score}</span></div><h3 tabindex="-1">«${text}»</h3><div class="quiz-answers"><button type="button" data-answer="false">Миф</button><button type="button" data-answer="true">Факт</button></div><div class="quiz-feedback" aria-live="polite"></div><button type="button" class="button quiz-next" hidden>${questionIndex === 4 ? "Показать результат" : "Следующий вопрос"} →</button>`;
    let answered = false;
    quiz.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      const right = (button.dataset.answer === "true") === correct;
      if (right) score++;
      button.classList.add("chosen");
      quiz.querySelectorAll("[data-answer]").forEach(item => { item.disabled = true; });
      quiz.querySelector(".quiz-feedback").innerHTML = `<p><strong>${right ? "Верно!" : "Не совсем."} Это ${correct ? "факт" : "миф"}.</strong> ${explanation}${sourceLink(source)}</p>`;
      quiz.querySelector(".quiz-next").hidden = false;
    }));
    quiz.querySelector(".quiz-next").addEventListener("click", () => { questionIndex++; renderQuiz(true); });
  }
  if (focus) quiz.querySelector("h3").focus({ preventScroll: true });
}
renderQuiz();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const formatNumber = (number, digits) => number.toLocaleString("ru-RU", { minimumFractionDigits: digits, maximumFractionDigits: digits });
function animateCounter(element) {
  const target = Number(element.dataset.count);
  const digits = Number(element.dataset.digits || 0);
  if (reduceMotion.matches) return;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / 1100, 1);
    element.textContent = formatNumber(target * (1 - (1 - progress) ** 3), digits);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    if (entry.target.matches("[data-count]")) animateCounter(entry.target);
    observer.unobserve(entry.target);
  }), { threshold: 0.12 });
  document.querySelectorAll(".card,.stats,.section-heading,.diagram,.gyre,[data-count]").forEach(element => {
    if (!element.matches("[data-count]")) element.classList.add("reveal");
    observer.observe(element);
  });
}

const sections = [...document.querySelectorAll("main > section")];
const navLinks = [...document.querySelectorAll(".header nav a")];
function updateScroll() {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  document.querySelector("#reading-bar").style.width = `${height > 0 ? Math.min(100, window.scrollY / height * 100) : 0}%`;
  document.querySelector("#back-top").classList.toggle("visible", window.scrollY > 650);
  let current = "home";
  sections.forEach(section => { if (section.getBoundingClientRect().top <= 160) current = section.id; });
  navLinks.forEach(link => {
    const active = link.hash === `#${current}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
  });
}
let scrollScheduled = false;
window.addEventListener("scroll", () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  requestAnimationFrame(() => { updateScroll(); scrollScheduled = false; });
}, { passive: true });
window.addEventListener("resize", updateScroll);
updateScroll();

// Мобильная навигация: закрывается после перехода, по Escape и при смене ширины.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
function closeMenu(returnFocus = false) {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Открыть меню");
  navigation.classList.remove("is-open");
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  navigation.classList.toggle("is-open", open);
});
navigation.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
document.addEventListener("click", event => { if (!event.target.closest(".header")) closeMenu(); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") closeMenu(true);
});
window.matchMedia("(min-width: 901px)").addEventListener("change", () => closeMenu());

// Десять основных слайдов. Порядок можно изменить в этом массиве.
const slideIds = ["home", "relevance", "pollution", "facts", "effects", "example", "solution", "guard-process", "impact", "defense"];
const slides = slideIds.map(id => document.getElementById(id));
const controls = document.querySelector("#presentation-controls");
const startButton = document.querySelector("#start-presentation");
let presenting = false;
let slideIndex = 0;
let previousScroll = 0;
function showSlide(index, focus = true) {
  slideIndex = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, i) => slide.classList.toggle("slide-active", i === slideIndex));
  document.querySelector("#slide-status").textContent = `${slideIndex + 1} / ${slides.length} · ${slides[slideIndex].dataset.slide}`;
  document.querySelector("#previous-slide").disabled = slideIndex === 0;
  document.querySelector("#next-slide").disabled = slideIndex === slides.length - 1;
  window.scrollTo({ top: 0, behavior: "instant" });
  if (focus) {
    const heading = slides[slideIndex].querySelector("h1,h2");
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}
function exitPresentation(restore = true) {
  presenting = false;
  document.body.classList.remove("presenting");
  controls.hidden = true;
  slides.forEach(slide => slide.classList.remove("slide-active"));
  if (restore) {
    window.scrollTo({ top: previousScroll, behavior: "instant" });
    startButton.focus({ preventScroll: true });
  }
  updateScroll();
}
startButton.addEventListener("click", () => {
  previousScroll = window.scrollY;
  presenting = true;
  document.body.classList.add("presenting");
  controls.hidden = false;
  showSlide(0);
});
document.querySelector("#previous-slide").addEventListener("click", () => showSlide(slideIndex - 1));
document.querySelector("#next-slide").addEventListener("click", () => showSlide(slideIndex + 1));
document.querySelector("#exit-presentation").addEventListener("click", () => exitPresentation());
document.addEventListener("keydown", event => {
  if (!presenting || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "Escape") { event.preventDefault(); exitPresentation(); return; }
  if (event.target instanceof Element && event.target.closest("input,textarea,select,[contenteditable=true]")) return;
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    showSlide(slideIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});
// Ссылки на источники остаются рабочими даже когда остальные слайды скрыты.
document.addEventListener("click", event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || !presenting) return;
  const target = document.getElementById(link.getAttribute("href").slice(1));
  if (!target) return;
  event.preventDefault();
  exitPresentation(false);
  target.scrollIntoView({ behavior: "instant", block: "start" });
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
});


