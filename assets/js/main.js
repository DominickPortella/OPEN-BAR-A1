/* --- 1. CONFIGURACIÓN DE COMPONENTES --- */
async function loadComponent(id, path, cssPath, jsPath) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("No se pudo cargar el HTML");
        const html = await response.text();
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = html;
        }

        if (cssPath) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssPath + "?v=" + new Date().getTime();
            document.head.appendChild(link);
        }

        if (jsPath) {
            const script = document.createElement('script');
            script.src = jsPath + "?v=" + new Date().getTime();
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
    // Aquí irás agregando tus otros 19 eventos siguiendo el mismo formato
};

/* --- 3. FUNCIONES DE NAVEGACIÓN --- */
function verEvento(id) {
    window.location.href = `evento-detalle.html?id=${id}`;
}

/* --- 4. LÓGICA DE CARGA DINÁMICA --- */
function initDetalleEvento() {
    // Verificamos si estamos en la página de detalle
    if (window.location.pathname.includes('evento-detalle.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const evento = eventosData[id];

        if (evento) {
            // Rellenamos los textos
            const tituloElem = document.getElementById('evento-titulo');
            const ubicacionElem = document.getElementById('evento-ubicacion');
            const galeria = document.getElementById('galeria-grid');

            if (tituloElem) tituloElem.innerText = evento.titulo;
            if (ubicacionElem) ubicacionElem.innerText = evento.ubicacion;

            // Limpiamos y cargamos la galería
            if (galeria) {
                galeria.innerHTML = '';
                evento.medios.forEach(medio => {
                    if (medio.type === 'image') {
                        galeria.innerHTML += `
            <div class="galeria-item">
                <img src="${medio.url}" alt="Foto del evento">
            </div>`;
                    } else if (medio.type === 'video') {
                        galeria.innerHTML += `
        <div class="galeria-item">
            <video src="${medio.url}" controls class="video-galeria"></video>
        </div>`;
                    }
                });
            }
        } else {
            console.warn("Evento no encontrado en la base de datos");
        }
    }
}

/* --- 5. INICIO DE LA APLICACIÓN --- */
async function startApp() {
    // Carga de Header
    await loadComponent(
        'header-container',
        'assets/components/header.html',
        'assets/components/header.css',
        'assets/js/header.js'
    );

    // Carga de Footer
    await loadComponent(
        'footer-container',
        'assets/components/footer.html',
        'assets/components/footer.css'
    );

    // Ejecutar lógica de detalle después de cargar componentes
    initDetalleEvento();
}

async function cargarComponentes() {
    // Detecta si estás en la carpeta /pages/ para ajustar la ruta de búsqueda
    const enCarpetaPages = window.location.pathname.includes('/pages/');
    const rutaBase = enCarpetaPages ? '../assets/components/' : 'assets/components/';
    const rutaJS = enCarpetaPages ? '../assets/js/' : 'assets/js/';

    try {
        // 1. Cargar Header
        const hRes = await fetch(`${rutaBase}header.html`);
        const headerHTML = await hRes.text();
        document.getElementById('header-placeholder').innerHTML = headerHTML;

        // 2. Cargar Footer
        const fRes = await fetch(`${rutaBase}footer.html`);
        document.getElementById('footer-placeholder').innerHTML = fRes.text();

        // 3. CARGAR EL JS DEL HEADER DINÁMICAMENTE
        // Esto es lo que activa la X y la barra lateral al mismo tiempo
        const script = document.createElement('script');
        script.src = `${rutaJS}header.js?v=${new Date().getTime()}`;
        document.body.appendChild(script);

    } catch (error) {
        console.error("Error cargando componentes:", error);
    }
}

function activarEventosMenu() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-menu');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', cargarComponentes);

// Lanzar todo al cargar el DOM
window.onload = startApp;