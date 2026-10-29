(function () {
  var key = "portfolio-theme";
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  function stored() { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function save(value) { try { localStorage.setItem(key, value); } catch (_) {} }
  function preferred() { return media.matches ? "dark" : "light"; }
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var button = document.getElementById("portfolio-theme-toggle");
    if (button) {
      button.textContent = theme === "dark" ? "☀ Light mode" : "☾ Dark mode";
      button.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
      button.setAttribute("aria-pressed", String(theme === "dark"));
    }
  }
  apply(stored() || preferred());
  function init() {
    if (document.getElementById("portfolio-theme-toggle")) return;
    var button = document.createElement("button");
    button.type = "button";
    button.id = "portfolio-theme-toggle";
    button.className = "theme-toggle";
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      save(next);
      apply(next);
    });
    document.body.appendChild(button);
    apply(root.getAttribute("data-theme") || preferred());
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  if (media.addEventListener) media.addEventListener("change", function () { if (!stored()) apply(preferred()); });
})();