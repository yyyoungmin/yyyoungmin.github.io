document.addEventListener("DOMContentLoaded", function () {
  const panels = Array.from(document.querySelectorAll(".panel"));
  const headerHeight = 55;

  function layoutPanels(activeIndex = null) {
    const total = panels.length;

    panels.forEach((panel) => {
      panel.classList.remove("active");
    });

    if (activeIndex === null) {
      panels.forEach((panel, i) => {
        panel.style.top = "auto";
        panel.style.bottom = `${(total - 1 - i) * headerHeight}px`;
        panel.style.height = `${headerHeight}px`;
      });
      return;
    }

    panels[activeIndex].classList.add("active");

    panels.forEach((panel, i) => {
      if (i < activeIndex) {
        panel.style.top = `${i * headerHeight}px`;
        panel.style.bottom = "auto";
        panel.style.height = `${headerHeight}px`;
      } else if (i === activeIndex) {
        const belowCount = total - activeIndex - 1;
        const bottomReserved = belowCount * headerHeight;

        panel.style.top = `${i * headerHeight}px`;
        panel.style.bottom = "auto";
        panel.style.height = `calc(100vh - ${i * headerHeight}px - ${bottomReserved}px)`;
      } else {
        const fromBottom = total - 1 - i;
        panel.style.bottom = "auto";
        panel.style.top = `calc(100vh - ${(fromBottom + 1) * headerHeight}px)`;
        panel.style.height = `${headerHeight}px`;
      }
    });
  }

  panels.forEach((panel, index) => {
    panel.addEventListener("click", () => {
      const isActive = panel.classList.contains("active");
      layoutPanels(isActive ? null : index);
    });
  });

  const koBtn = document.getElementById("koBtn");
  const enBtn = document.getElementById("enBtn");
  const jpBtn = document.getElementById("jpBtn");
  const langToggle = document.querySelector(".lang-toggle");

  let currentLang = localStorage.getItem("lang") || "ko";

  function setLanguage(lang, openAbout = true) {
    const elements = document.querySelectorAll("[data-" + lang + "]");

    elements.forEach((el) => {
      el.innerHTML = el.dataset[lang];
    });

    currentLang = lang;
    localStorage.setItem("lang", lang);
    updateButtons();

    if (openAbout) {
      layoutPanels(0);
    }
  }

  function updateButtons() {
    koBtn.style.display = "block";
    enBtn.style.display = "block";
    jpBtn.style.display = "block";

    if (currentLang === "ko") koBtn.style.display = "none";
    if (currentLang === "en") enBtn.style.display = "none";
    if (currentLang === "jp") jpBtn.style.display = "none";
  }

  if (langToggle) {
    langToggle.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  koBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    setLanguage("ko");
  });

  enBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    setLanguage("en");
  });

  jpBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    setLanguage("jp");
  });

  // 첫 화면은 무조건 닫힌 상태
  setLanguage(currentLang, false);
  layoutPanels(null);
});