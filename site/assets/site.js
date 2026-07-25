const storageKey = "alc-001-language";
const buttons = document.querySelectorAll("[data-language-button]");
const supported = new Set(["zh", "en"]);

function setLanguage(language) {
  const next = supported.has(language) ? language : "zh";
  document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  document.documentElement.dataset.language = next;
  localStorage.setItem(storageKey, next);

  buttons.forEach((button) => {
    const active = button.dataset.languageButton === next;
    button.setAttribute("aria-pressed", String(active));
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.languageButton));
});

const saved = localStorage.getItem(storageKey);
const preferred = navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
setLanguage(saved || preferred);

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
