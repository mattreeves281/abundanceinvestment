(function () {
  var toggle = document.querySelector(".abundance-civic-menu-toggle");
  var nav = document.getElementById("abundance-civic-nav");

  if (!toggle || !nav) return;

  function setOpen(isOpen) {
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    nav.classList.toggle("is-open", isOpen);
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 900px)").matches) setOpen(false);
  });
})();
