/* Contador y carrusel independientes del catálogo y del carrito. */
(() => {
    const oferta = document.getElementById('contadorOferta');
    const header = document.querySelector('header');
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Mide el encabezado para que el contador sticky quede debajo, incluso en móvil.
    const ajustarHeader = () => document.documentElement.style.setProperty('--gs-header', `${header?.getBoundingClientRect().height || 0}px`);
    ajustarHeader();
    if (header) new ResizeObserver(ajustarHeader).observe(header);

    // Oferta de demostración: 90 minutos a partir de cada carga de página.
    const fin = Date.now() + 90 * 60 * 1000;
    const campos = ['horas', 'minutos', 'segundos'].map(id => document.getElementById(id));
    let intervalo;
    function actualizar() {
        const total = Math.max(0, Math.ceil((fin - Date.now()) / 1000));
        [Math.floor(total / 3600), Math.floor(total % 3600 / 60), total % 60]
            .forEach((valor, i) => campos[i].textContent = String(valor).padStart(2, '0'));
        if (total === 0) {
            clearInterval(intervalo);
            oferta.querySelector('.gs-oferta-titulo').textContent = 'OFERTA FINALIZADA';
            oferta.querySelector('strong').textContent = 'Consulta nuestros productos';
            oferta.querySelector('.gs-aprovechar').textContent = 'Ver productos';
        }
    }
    actualizar();
    intervalo = setInterval(actualizar, 1000);
    function ajustarScroll() { oferta.classList.toggle('compacto', window.scrollY > 150); }
    window.addEventListener('scroll', ajustarScroll, {passive:true});
    ajustarScroll();
    oferta.addEventListener('mouseenter', event => {
        if (reducido.matches) return;
        const rect = oferta.getBoundingClientRect();
        const efectos = oferta.querySelector('.gs-efectos');
        for (let i = 0; i < 25; i++) {
            const particula = document.createElement('span');
            particula.className = 'gs-particula';
            particula.style.left = `${event.clientX - rect.left}px`;
            particula.style.top = `${event.clientY - rect.top}px`;
            const angulo = Math.random() * Math.PI * 2;
            const distancia = 40 + Math.random() * 80;
            particula.style.setProperty('--x', `${Math.cos(angulo) * distancia}px`);
            particula.style.setProperty('--y', `${Math.sin(angulo) * distancia}px`);
            efectos.appendChild(particula);
            setTimeout(() => particula.remove(), 800);
        }
    });

    const carrusel = document.querySelector('.gs-carrusel');
    const slides = [...carrusel.querySelectorAll('.gs-slide')];
    const puntos = [...carrusel.querySelectorAll('.gs-indicador')];
    let actual = 0;
    function mostrar(indice, anunciar = true) {
        actual = (indice + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.hidden = i !== actual);
        puntos.forEach((punto, i) => {
            if (i === actual) punto.setAttribute('aria-current', 'true');
            else punto.removeAttribute('aria-current');
        });
        if (anunciar) carrusel.querySelector('[data-gs-estado]').textContent = slides[actual].getAttribute('aria-label');
    }
    carrusel.querySelector('[data-gs-anterior]').addEventListener('click', () => mostrar(actual - 1));
    carrusel.querySelector('[data-gs-siguiente]').addEventListener('click', () => mostrar(actual + 1));
    puntos.forEach((punto, i) => punto.addEventListener('click', () => mostrar(i)));
    mostrar(0, false);
})();
