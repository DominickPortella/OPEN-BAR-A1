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
    if (items.length > 0) {
        items.forEach(item => item.style.transform = `translateX(0%)`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const categoriaId = params.get('id');
    const categoria = eventosData[categoriaId];

    console.log("Cargando categoría:", categoriaId); // Para debugear

    if (categoria && categoria.eventos) {
        document.getElementById('evento-titulo').innerText = categoria.titulo;

        const container = document.getElementById('eventos-destacados-container');
        container.innerHTML = ''; // Limpiar

        categoria.eventos.forEach(evento => {
            const imagen = evento.portada.includes('http') ? evento.portada : 'https://via.placeholder.com/300x400?text=Bartender+A1';

            const card = `
        <div class="evento-card-small" onclick="abrirEvento('${categoriaId}', '${evento.id}')">
            <img src="${imagen}" alt="${evento.nombre}">
            <div class="card-info-detalle">
                <h3>${evento.nombre}</h3>
                <p>${evento.lugar}</p>
            </div>
        </div>
    `;
            container.innerHTML += card;
        });
    }
});

function abrirEvento(catId, eveId) {
    const evento = eventosData[catId].eventos.find(e => e.id === eveId);
    if (evento) {
        document.getElementById('modal-titulo-evento').innerText = evento.nombre;
        const grid = document.getElementById('modal-grid');
        grid.innerHTML = '';

        evento.galeria.forEach(item => {
            if (item.type === 'image') {
                grid.innerHTML += `<img src="${item.url}" style="width:100%; margin-bottom:10px;">`;
            } else {
                grid.innerHTML += `<video src="${item.url}" controls style="width:100%;"></video>`;
            }
        });
        document.getElementById('modal-galeria').style.display = 'flex';
    }
}

function cerrarModal() {
    const modal = document.getElementById('modal-galeria');

    // 1. Buscamos todos los videos dentro del modal
    const videos = modal.querySelectorAll('video');

    // 2. Los pausamos uno por uno y reseteamos el tiempo
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0; // Opcional: vuelve al inicio para que no se quede a medias
    });

    // 3. Ocultamos el modal y devolvemos el scroll a la página
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        cerrarModal();
    }
});