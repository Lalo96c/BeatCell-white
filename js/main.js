// =====================
// AOS
// =====================
if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true
    });
}

// =====================
// FORMULARIO WHATSAPP (INDEX)
// =====================
const formCurso = document.getElementById("formulario");

if (formCurso) {
    formCurso.addEventListener("submit", function (e) {

        e.preventDefault();

        let nombre = document.getElementById("nombreCurso").value;
        let telefono = document.getElementById("telefono").value;
        let email = document.getElementById("email").value;
        let mensaje = document.getElementById("mensajeCurso").value;

        // 🔥 Detectar curso automáticamente
        let selectCurso = document.getElementById("programa");

        let curso = "";

        if (selectCurso) {
            curso = selectCurso.value; // index (con select)
        } else {
            curso = formCurso.dataset.curso; // páginas internas
        }

        let texto =
            "Hola BeatCell Academy,%0A%0A" +
            "Estoy interesado en el curso de: " + curso + "%0A%0A" +
            "Nombre: " + nombre + "%0A" +
            "Teléfono: " + telefono + "%0A" +
            "Email: " + email + "%0A" +
            "Mensaje: " + mensaje;

        window.open(
            "https://wa.me/51910488419?text=" + texto,
            "_blank"
        );
    });
}

// =====================
// AÑO AUTOMÁTICO
// =====================
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// =====================
// LIGHTBOX + CARRUSEL PRO
// =====================
const track = document.querySelector(".carousel-track");
const images = document.querySelectorAll(".carousel img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

// =====================
// CLICK IMAGEN (abrir)
// =====================
if (images.length > 0 && track && lightbox && lightboxImg && closeBtn) {

    images.forEach(img => {
        img.addEventListener("click", () => {

            track.style.animationPlayState = "paused";

            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    // cerrar con X
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
        track.style.animationPlayState = "running";
    });

    // cerrar fuera
    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
            track.style.animationPlayState = "running";
        }
    });
}

// =====================
// PAUSA AL TOCAR (MÓVIL)
// =====================
if (track) {
    track.addEventListener("touchstart", () => {
        track.style.animationPlayState = "paused";
    });

    track.addEventListener("touchend", () => {
        track.style.animationPlayState = "running";
    });
}

// =====================
// SWIPE MANUAL (DRAG)
// =====================
let isDown = false;
let startX;
let scrollLeft;

if (track) {

    track.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX;
        track.style.animationPlayState = "paused";
    });

    track.addEventListener("mouseleave", () => {
        isDown = false;
        track.style.animationPlayState = "running";
    });

    track.addEventListener("mouseup", () => {
        isDown = false;
        track.style.animationPlayState = "running";
    });

    track.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();

        const walk = (e.pageX - startX) * 1.5;
        track.style.transform = `translateX(${walk}px)`;
    });

}

// =====================
// FORMULARIO RECLAMOS
// =====================
const formReclamo = document.getElementById("formReclamo");

if (formReclamo) {
    formReclamo.addEventListener("submit", function (e) {

        e.preventDefault();

        const nombre = document.getElementById("nombreReclamo");
        const dni = document.getElementById("dni");
        const correo = document.getElementById("correo");
        const tipo = document.getElementById("tipo");
        const mensaje = document.getElementById("mensajeReclamo");

        if (!nombre || !dni || !correo || !tipo || !mensaje) return;

        let asunto = "Libro de Reclamaciones - BeatCell Academy";

        let texto = `Nuevo registro en el Libro de Reclamaciones

Nombre: ${nombre.value}
DNI: ${dni.value}
Correo: ${correo.value}

Tipo: ${tipo.value}

Detalle del reclamo:
${mensaje.value}`;

        let mail = "mailto:reclamos@beatcellacademy.com"
            + "?subject=" + encodeURIComponent(asunto)
            + "&body=" + encodeURIComponent(texto);

        window.location.href = mail;
    });
}