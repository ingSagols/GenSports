document.addEventListener("DOMContentLoaded", function () {
    inicializarOfertaHero();
});


function inicializarOfertaHero() {
    inicializarContadorOferta();
    inicializarCarruselHero();
}


/* =====================================================
   CONTADOR DE OFERTA
===================================================== */

function inicializarContadorOferta() {
    const oferta =
        document.getElementById("contadorOferta");

    const horas =
        document.getElementById("horas");

    const minutos =
        document.getElementById("minutos");

    const segundos =
        document.getElementById("segundos");

    const header =
        document.querySelector("header");

    if (!oferta || !horas || !minutos || !segundos) {
        console.warn(
            "Contador: faltan elementos en el HTML."
        );

        return;
    }

    function ajustarAlturaHeader() {
        const altura =
            header ?
                header.getBoundingClientRect().height :
                0;

        document.documentElement.style.setProperty(
            "--gs-header",
            `${altura}px`
        );
    }

    ajustarAlturaHeader();

    if (
        header &&
        typeof ResizeObserver !== "undefined"
    ) {
        const observador =
            new ResizeObserver(
                ajustarAlturaHeader
            );

        observador.observe(header);
    }

    let tiempoRestante = 90 * 60;
    let intervalo = null;

    function actualizarContador() {
        const horasCalculadas =
            Math.floor(tiempoRestante / 3600);

        const minutosCalculados =
            Math.floor(
                (tiempoRestante % 3600) / 60
            );

        const segundosCalculados =
            tiempoRestante % 60;

        horas.textContent =
            String(horasCalculadas).padStart(2, "0");

        minutos.textContent =
            String(minutosCalculados).padStart(2, "0");

        segundos.textContent =
            String(segundosCalculados).padStart(2, "0");

        if (tiempoRestante <= 0) {
            clearInterval(intervalo);

            const titulo =
                oferta.querySelector(
                    ".gs-oferta-titulo"
                );

            const descripcion =
                oferta.querySelector("strong");

            const boton =
                oferta.querySelector(
                    ".gs-aprovechar"
                );

            if (titulo) {
                titulo.textContent =
                    "OFERTA FINALIZADA";
            }

            if (descripcion) {
                descripcion.textContent =
                    "Consulta nuestros productos";
            }

            if (boton) {
                boton.textContent =
                    "Ver productos";
            }

            return;
        }

        tiempoRestante--;
    }

    actualizarContador();

    intervalo =
        setInterval(
            actualizarContador,
            1000
        );

    function actualizarModoCompacto() {
        oferta.classList.toggle(
            "compacto",
            window.scrollY > 150
        );
    }

    actualizarModoCompacto();

    window.addEventListener(
        "scroll",
        actualizarModoCompacto,
        {
            passive: true
        }
    );

    const efectos =
        oferta.querySelector(".gs-efectos");

    const movimientoReducido =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (efectos) {
        oferta.addEventListener(
            "mouseenter",
            function (evento) {
                if (movimientoReducido.matches) {
                    return;
                }

                const rect =
                    oferta.getBoundingClientRect();

                for (let i = 0; i < 25; i++) {
                    const particula =
                        document.createElement("span");

                    particula.className =
                        "gs-particula";

                    particula.style.left =
                        `${evento.clientX - rect.left}px`;

                    particula.style.top =
                        `${evento.clientY - rect.top}px`;

                    const angulo =
                        Math.random() *
                        Math.PI *
                        2;

                    const distancia =
                        40 +
                        Math.random() *
                        80;

                    particula.style.setProperty(
                        "--x",
                        `${Math.cos(angulo) * distancia}px`
                    );

                    particula.style.setProperty(
                        "--y",
                        `${Math.sin(angulo) * distancia}px`
                    );

                    efectos.appendChild(
                        particula
                    );

                    setTimeout(
                        function () {
                            particula.remove();
                        },
                        800
                    );
                }
            }
        );
    }
}


/* =====================================================
   CARRUSEL DEL HERO
===================================================== */

function inicializarCarruselHero() {
    const carrusel =
        document.querySelector(
            ".gs-carrusel"
        );

    if (!carrusel) {
        console.warn(
            "Carrusel: no se encontró .gs-carrusel."
        );

        return;
    }

    const slides =
        Array.from(
            carrusel.querySelectorAll(
                ".gs-slide"
            )
        );

    const indicadores =
        Array.from(
            carrusel.querySelectorAll(
                ".gs-indicador"
            )
        );

    const anterior =
        carrusel.querySelector(
            "[data-gs-anterior]"
        );

    const siguiente =
        carrusel.querySelector(
            "[data-gs-siguiente]"
        );

    const estado =
        carrusel.querySelector(
            "[data-gs-estado]"
        );

    if (
        slides.length === 0 ||
        !anterior ||
        !siguiente
    ) {
        console.warn(
            "Carrusel: faltan slides o botones."
        );

        return;
    }

    let indiceActual = 0;

    function mostrarSlide(indice, anunciar) {
        indiceActual =
            (indice + slides.length) %
            slides.length;

        slides.forEach(
            function (slide, indiceSlide) {
                slide.hidden =
                    indiceSlide !== indiceActual;
            }
        );

        indicadores.forEach(
            function (indicador, indiceIndicador) {
                if (
                    indiceIndicador ===
                    indiceActual
                ) {
                    indicador.setAttribute(
                        "aria-current",
                        "true"
                    );
                } else {
                    indicador.removeAttribute(
                        "aria-current"
                    );
                }
            }
        );

        if (anunciar && estado) {
            estado.textContent =
                slides[indiceActual].getAttribute(
                    "aria-label"
                ) || "";
        }
    }

    anterior.addEventListener(
        "click",
        function () {
            mostrarSlide(
                indiceActual - 1,
                true
            );
        }
    );

    siguiente.addEventListener(
        "click",
        function () {
            mostrarSlide(
                indiceActual + 1,
                true
            );
        }
    );

    indicadores.forEach(
        function (indicador, indice) {
            indicador.addEventListener(
                "click",
                function () {
                    mostrarSlide(
                        indice,
                        true
                    );
                }
            );
        }
    );

    mostrarSlide(0, false);
}