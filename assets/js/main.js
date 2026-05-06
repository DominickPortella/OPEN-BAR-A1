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
    'cumpleanos': {
        titulo: "Cumpleaños Especiales",
        eventos: [
            {
                id: 'cumple-ronald',
                nombre: "Cumpleaños de Ronald",
                lugar: "Villa María del Triunfo",
                portada: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg',
                galeria: [
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg' },
                    { type: 'video', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777305598/1243179581133581_HD_da0z1i.mp4' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306332/670424389_18116144788665306_4159129936483618943_n_g6x2hs.jpg' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306359/670559848_18116144812665306_3101233373304988321_n_uvw0tw.jpg' },
                    { type: 'video  ', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777306501/1435869547745943_HD_zshy7v.mp4' }
                ]
            },
            {
                id: 'cumple-sofia',
                nombre: "Cumpleaños de Sofía",
                lugar: "La Molina",
                portada: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777871169/658862429_18114012943665306_7230823319736606173_n_aepp3e.jpg',
                galeria: [
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg' },
                    { type: 'video', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777305598/1243179581133581_HD_da0z1i.mp4' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306332/670424389_18116144788665306_4159129936483618943_n_g6x2hs.jpg' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306359/670559848_18116144812665306_3101233373304988321_n_uvw0tw.jpg' },
                    { type: 'video  ', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777306501/1435869547745943_HD_zshy7v.mp4' }
                ]
            }
        ]
    },
    'empresarial': {
        titulo: "Corporativos & Empresas",
        eventos: [
            {
                id: 'cumple-ronald',
                nombre: "Cumpleaños de Ronald",
                lugar: "Villa María del Triunfo",
                portada: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg',
                galeria: [
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg' },
                    { type: 'video', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777305598/1243179581133581_HD_da0z1i.mp4' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306332/670424389_18116144788665306_4159129936483618943_n_g6x2hs.jpg' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306359/670559848_18116144812665306_3101233373304988321_n_uvw0tw.jpg' },
                    { type: 'video  ', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777306501/1435869547745943_HD_zshy7v.mp4' }
                ]
            },
            {
                id: 'cumple-sofia',
                nombre: "Cumpleaños de Sofía",
                lugar: "La Molina",
                portada: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777871169/658862429_18114012943665306_7230823319736606173_n_aepp3e.jpg',
                galeria: [
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg' },
                    { type: 'video', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777305598/1243179581133581_HD_da0z1i.mp4' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306332/670424389_18116144788665306_4159129936483618943_n_g6x2hs.jpg' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306359/670559848_18116144812665306_3101233373304988321_n_uvw0tw.jpg' },
                    { type: 'video  ', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777306501/1435869547745943_HD_zshy7v.mp4' }
                ]
            }
        ]
    },
    'quinceaneros': {
        titulo: "Quinceañeros",
        ubicacion: "Barras Móviles Temáticas",
        medios: [
            { type: 'image', url: 'https://link-a-foto-quince.jpg' }
        ]
    },
    'matrimonios': {
        titulo: "Bodas & Matrimonios",
        eventos: [
            {
                id: 'cumple-ronald',
                nombre: "Cumpleaños de Ronald",
                lugar: "Villa María del Triunfo",
                portada: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg',
                galeria: [
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg' },
                    { type: 'video', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777305598/1243179581133581_HD_da0z1i.mp4' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306332/670424389_18116144788665306_4159129936483618943_n_g6x2hs.jpg' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306359/670559848_18116144812665306_3101233373304988321_n_uvw0tw.jpg' },
                    { type: 'video  ', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777306501/1435869547745943_HD_zshy7v.mp4' }
                ]
            },
            {
                id: 'cumple-sofia',
                nombre: "Cumpleaños de Sofía",
                lugar: "La Molina",
                portada: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777871169/658862429_18114012943665306_7230823319736606173_n_aepp3e.jpg',
                galeria: [
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg' },
                    { type: 'video', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777305598/1243179581133581_HD_da0z1i.mp4' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306332/670424389_18116144788665306_4159129936483618943_n_g6x2hs.jpg' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306359/670559848_18116144812665306_3101233373304988321_n_uvw0tw.jpg' },
                    { type: 'video  ', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777306501/1435869547745943_HD_zshy7v.mp4' }
                ]
            }
        ]
    },
    'juveniles': {
        titulo: "Juveniles",
        eventos: [
            {
                id: 'cumple-ronald',
                nombre: "Cumpleaños de Ronald",
                lugar: "Villa María del Triunfo",
                portada: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg',
                galeria: [
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg' },
                    { type: 'video', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777305598/1243179581133581_HD_da0z1i.mp4' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306332/670424389_18116144788665306_4159129936483618943_n_g6x2hs.jpg' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306359/670559848_18116144812665306_3101233373304988321_n_uvw0tw.jpg' },
                    { type: 'video  ', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777306501/1435869547745943_HD_zshy7v.mp4' }
                ]
            },
            {
                id: 'cumple-sofia',
                nombre: "Cumpleaños de Sofía",
                lugar: "La Molina",
                portada: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777871169/658862429_18114012943665306_7230823319736606173_n_aepp3e.jpg',
                galeria: [
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777300559/669852632_18116144800665306_1928821062832928060_n_ymebmx.jpg' },
                    { type: 'video', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777305598/1243179581133581_HD_da0z1i.mp4' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306332/670424389_18116144788665306_4159129936483618943_n_g6x2hs.jpg' },
                    { type: 'image', url: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777306359/670559848_18116144812665306_3101233373304988321_n_uvw0tw.jpg' },
                    { type: 'video  ', url: 'https://res.cloudinary.com/dzhstkyeu/video/upload/v1777306501/1435869547745943_HD_zshy7v.mp4' }
                ]
            }
        ]
    }
};

/* --- 3. FUNCIONES DE NAVEGACIÓN --- */
function verCategoria(id) {
    // Redirige a la misma página de detalle, pero pasando el ID de la categoría
    window.location.href = `evento-detalle.html?id=${id}`;
}



/* --- 5. INICIO DE LA APLICACIÓN --- */
async function startApp() {
    // Detectamos qué contenedor de header/footer existe en el HTML actual
    const headerId = document.getElementById('header-placeholder') ? 'header-placeholder' : 'header-container';
    const footerId = document.getElementById('footer-placeholder') ? 'footer-placeholder' : 'footer-container';

    // Cargamos componentes
    await loadComponent(headerId, 'assets/components/header.html', 'assets/components/header.css', 'assets/js/header.js');
    await loadComponent(footerId, 'assets/components/footer.html', 'assets/components/footer.css');

    // ¡PASO CLAVE! Ajustamos los enlaces del menú después de cargarlos
    ajustarRutasNavegacion();

    initDetalleEvento();
}

function ajustarRutasNavegacion() {
    const esPaginaEnPages = window.location.pathname.includes('/pages/');
    const esPaginaDetalle = window.location.pathname.includes('evento-detalle.html');

    // Seleccionamos todos los enlaces del menú y el logo
    const navLinks = document.querySelectorAll('.nav-menu a, .nav-menu-mobile a, .logo, .footer-links a');

    navLinks.forEach(link => {
        let href = link.getAttribute('href');
        if (!href || href === '#' || href.startsWith('http')) return;

        // CASO A: Estás en /pages/cocteles.html
        if (esPaginaEnPages) {
            if (href === 'index.html' || href === '../index.html') {
                link.setAttribute('href', '../index.html'); // Sube un nivel para ir a la raíz
            } else if (!href.startsWith('../') && !href.includes('pages/')) {
                // Si el enlace apunta a otra página en la raíz (como evento-detalle)
                link.setAttribute('href', '../' + href);
            }
        }
        // CASO B: Estás en /evento-detalle.html (Raíz)
        else if (esPaginaDetalle) {
            if (href.startsWith('../')) {
                link.setAttribute('href', href.replace('../', './')); // Mantente en la raíz
            }
        }
    });
}

// Ejecutar al cargar
window.addEventListener('load', startApp);