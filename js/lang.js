/* Persistent ES/EN language toggle.
   The initial class is set inline in <head> to avoid a flash of the wrong
   language; this script wires up the buttons and persists the choice. */
(function () {
  var KEY = "site-lang";

  function setLang(lang) {
    var html = document.documentElement;
    html.classList.toggle("lang-en", lang === "en");
    html.setAttribute("lang", lang);
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    var btns = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("active", btns[i].getAttribute("data-set-lang") === lang);
    }
  }

  function init() {
    var current = document.documentElement.classList.contains("lang-en") ? "en" : "es";
    setLang(current);

    var btns = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        setLang(this.getAttribute("data-set-lang"));
      });
    }

    // Mobile nav toggle
    var navToggle = document.querySelector(".nav-toggle");
    var navLinks = document.querySelector(".nav-links");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
