/* --- 1. CONFIGURACIÓN DE COMPONENTES --- */
async function loadComponent(id, path, cssPath, jsPath) {
    const enCarpetaPages = window.location.pathname.includes('/pages/');
    // Ajuste dinámico de ruta para GitHub Pages
    const rutaAjustada = enCarpetaPages ? '../' + path : path;

    try {
        const response = await fetch(rutaAjustada);
        if (!response.ok) throw new Error("No se pudo cargar: " + path);
        const html = await response.text();
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = html;
        }

        if (cssPath) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = (enCarpetaPages ? '../' + cssPath : cssPath) + "?v=" + new Date().getTime();
            document.head.appendChild(link);
        }

        if (jsPath) {
            const script = document.createElement('script');
            script.src = (enCarpetaPages ? '../' + jsPath : jsPath) + "?v=" + new Date().getTime();
            script.defer = true;
            document.body.appendChild(script);
        }
    } catch (err) {
        console.error("Error en loadComponent:", err);
    }
}

/* --- 2. BASE DE DATOS DE EVENTOS --- */
const eventosData = {
    'cumple-ronald': {
        titulo: "Cumpleaños de Ronald",
        ubicacion: "Villa Maria Del Triunfo, Lima, Perù",
        medios: [
            { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg' },
            { type: 'video', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777305598/1243179581133581_HD_da0z1i.mp4' },
            { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306332/670424389_18116144788665306_4159129936483618943_n_g6x2hs.jpg' },
            { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306359/670559848_18116144812665306_3101233373304988321_n_uvw0tw.jpg' },
            { type: 'video', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777306501/1435869547745943_HD_zshy7v.mp4' }
        ]
    }
};

/* --- 3. FUNCIONES DE NAVEGACIÓN --- */
function verEvento(id) {
    // Sin el / inicial para que funcione en subcarpetas de GitHub
    window.location.href = `evento-detalle.html?id=${id}`;
}

/* --- 4. LÓGICA DE CARGA DINÁMICA --- */
function initDetalleEvento() {
    if (window.location.pathname.includes('evento-detalle.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const evento = eventosData[id];

        if (evento) {
            const tituloElem = document.getElementById('evento-titulo');
            const ubicacionElem = document.getElementById('evento-ubicacion');
            const galeria = document.getElementById('galeria-grid');

            if (tituloElem) tituloElem.innerText = evento.titulo;
            if (ubicacionElem) ubicacionElem.innerText = evento.ubicacion;

            if (galeria) {
                galeria.innerHTML = '';
                evento.medios.forEach(medio => {
                    if (medio.type === 'image') {
                        galeria.innerHTML += `<div class="galeria-item"><img src="${medio.url}" alt="Foto"></div>`;
                    } else if (medio.type === 'video') {
                        galeria.innerHTML += `<div class="galeria-item"><video src="${medio.url}" controls class="video-galeria"></video></div>`;
                    }
                });
            }
        }
    }
}

/* --- 5. INICIO DE LA APLICACIÓN --- */
async function startApp() {
    // Usamos los IDs que tienes en tus HTML (header-placeholder o header-container)
    // Para asegurar compatibilidad, buscamos cuál existe:
    const headerId = document.getElementById('header-placeholder') ? 'header-placeholder' : 'header-container';
    const footerId = document.getElementById('footer-placeholder') ? 'footer-placeholder' : 'footer-container';

    await loadComponent(headerId, 'assets/components/header.html', 'assets/components/header.css', 'assets/js/header.js');
    await loadComponent(footerId, 'assets/components/footer.html', 'assets/components/footer.css');

    initDetalleEvento();
}

// Ejecutar al cargar
window.addEventListener('load', startApp);