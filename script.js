const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function closeMenu() {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});

// Marca como activa la sección que se está viendo
const links = [...nav.querySelectorAll("a")];
links.forEach(link => link.addEventListener("click", closeMenu));

const sections = links
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

function marcarActivo() {
  const y = window.scrollY + 120;
  let actual = sections[0];
  sections.forEach(s => { if (s.offsetTop <= y) actual = s; });
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
    actual = sections[sections.length - 1];
  }
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + actual.id));
}
window.addEventListener("scroll", marcarActivo, { passive: true });
marcarActivo();

document.querySelector("#year").textContent = new Date().getFullYear();
