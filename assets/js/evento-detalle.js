/* assets/js/evento-detalle.js */

// Variable global para controlar la diapositiva actual en esta página
let currentSlide = 0;

function moveCarousel(direction) {
    const items = document.querySelectorAll('.galeria-item');
    const totalItems = items.length;

    if (totalItems === 0) return;

    // 1. PAUSAR VIDEO ACTUAL (UX)
    const currentItem = items[currentSlide];
    const currentVideo = currentItem.querySelector('video');
    
    if (currentVideo) {
        currentVideo.pause();
        currentVideo.currentTime = 0; 
    }

    // 2. CÁLCULO DE ÍNDICE
    currentSlide += direction;

    if (currentSlide >= totalItems) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalItems - 1;
    }

    // 3. MOVIMIENTO VISUAL
    const offset = currentSlide * 100;
    items.forEach(item => {
        item.style.transform = `translateX(-${offset}%)`;
    });

    // 4. AUTOPLAY INTELIGENTE (UX Premium)
    const nextItem = items[currentSlide];
    const nextVideo = nextItem.querySelector('video');

    if (nextVideo) {
        nextVideo.play().catch(() => {
            nextVideo.muted = true; // Silenciar si el navegador bloquea el audio
            nextVideo.play();
        });
    }
}

// Función para inicializar el estado del carrusel (se llama desde main.js)
function initCarousel() {
    currentSlide = 0;
    const items = document.querySelectorAll('.galeria-item');
    if(items.length > 0) {
        items.forEach(item => item.style.transform = `translateX(0%)`);
    }
}