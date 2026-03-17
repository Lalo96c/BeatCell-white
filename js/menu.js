const hamburger = document.getElementById("hamburger");
const menuMobile = document.getElementById("menu-mobile");

// Crear overlay dinámicamente si no existe
let overlay = document.querySelector(".menu-overlay");
if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "menu-overlay";
    document.body.appendChild(overlay);
}

// Abrir/cerrar menú al hacer clic en hamburguesa
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menuMobile.classList.toggle("active");
    overlay.classList.toggle("active");
});

// Cerrar menú al clicar overlay
overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menuMobile.classList.remove("active");
    overlay.classList.remove("active");
});

// Cerrar menú al clicar un enlace
document.querySelectorAll("#menu-mobile a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        menuMobile.classList.remove("active");
        overlay.classList.remove("active");
    });
});