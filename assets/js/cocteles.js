// 1. "Base de datos" de cócteles
const listaCocteles = [
    {
        nombre: "Piña Colada",
        categoria: "ron",
        img: "https://res.cloudinary.com/dzhstkyeu/image/upload/v1777391705/pina_colada_lostragos-1_lybpsx.jpg",
        ingredientes: "Ron blanco, crema de coco, jugo de piña natural y hielo.",
        variedades: null
    },
    {
        nombre: "Pantera Rosa",
        categoria: "pisco",
        img: "https://res.cloudinary.com/dzhstkyeu/image/upload/v1777391934/53534.jpg_raqil5.jpg",
        ingredientes: "Pisco, crema de coco, granadina, jugo de piña y hielo licuado.",
        variedades: null
    },
    {
        nombre: "Algarrobina",
        categoria: "pisco",
        img: "https://res.cloudinary.com/dzhstkyeu/image/upload/v1777407698/RCZBEHLFJNE27AKYTY7BVFWNAQ_xe88ce.avif",
        ingredientes: "Pisco, jarabe de algarrobina, leche evaporada, yema de huevo y canela.",
        variedades: null
    },
    {
        nombre: "Pisco Sour",
        categoria: "pisco",
        img: "https://res.cloudinary.com/dzhstkyeu/image/upload/v1777392883/images_z1zrdv.jpg",
        variedades: [
            { nombre: 'Clásico', img: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777392883/images_z1zrdv.jpg', ing: 'Pisco, limón, jarabe de goma y clara de huevo.' },
            { nombre: 'Maracuyá', img: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777393039/Pisco-Sour-Maracuya-Misky-Hallpa-Alcala-de-Henares_cuz5b2.png', ing: 'Pisco, pulpa de maracuyá, jarabe de goma y clara de huevo.' }
        ]
    },
    {
        nombre: "Daiquiri",
        categoria: "ron",
        img: "https://res.cloudinary.com/dzhstkyeu/image/upload/v1777393222/Daiquiri_3000x3000_primary-206eb2330cb04852ab7d780dcf3d55ef_idgj51.jpg",
        variedades: [
            { nombre: 'Clásico', img: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777393222/Daiquiri_3000x3000_primary-206eb2330cb04852ab7d780dcf3d55ef_idgj51.jpg', ing: 'Ron blanco, jugo de limón y jarabe de goma.' },
            { nombre: 'Fresa', img: 'https://res.cloudinary.com/dzhstkyeu/image/upload/v1777393630/Daquiri-de-fresa-scaled_tprg8u.jpg', ing: 'Ron blanco, fresas frescas y jugo de limón.' }
        ]
    }
];

// 2. Función para pintar los cócteles en el grid
function renderCocteles(datos) {
    const grid = document.getElementById('grid-cocteles');
    if (!grid) return;
    grid.innerHTML = "";

    datos.forEach((c, index) => {
        const card = document.createElement('div');
        card.className = 'coctel-card';

        const esVariedad = c.variedades ? 'Ver sabores' : 'Saber más';

        card.innerHTML = `
            <img src="${c.img}" alt="${c.nombre}">
            <h3>${c.nombre}</h3>
            <button class="btn-saber-mas" id="btn-coctel-${index}">${esVariedad}</button>
        `;
        grid.appendChild(card);

        // Evento click seguro
        document.getElementById(`btn-coctel-${index}`).addEventListener('click', () => {
            abrirModal(c.nombre, c.img, c.ingredientes, c.variedades);
        });
    });
}

// 3. Función lógica del Modal
function abrirModal(titulo, imagen, ingredientes, variedades = null) {
    const modal = document.getElementById("modal-coctel");
    const tituloModal = document.getElementById("modal-titulo");
    const imgModal = document.getElementById("modal-img");
    const ingModal = document.getElementById("modal-ingredientes");
    const contenedorVariedades = document.querySelector(".lista-variedades");

    tituloModal.innerText = titulo;
    imgModal.src = imagen || "";

    if (variedades && variedades.length > 0) {
        imgModal.style.display = "none";
        ingModal.innerHTML = "";

        let html = "";
        variedades.forEach(v => {
            html += `
                <div class="item-variedad">
                    <img src="${v.img}" alt="${v.nombre}">
                    <div class="info-variedad">
                        <h4>${v.nombre}</h4>
                        <p>${v.ing}</p>
                    </div>
                </div><hr class="divisor-oro">`;
        });
        contenedorVariedades.innerHTML = html;
        contenedorVariedades.style.display = "block";
    } else {
        imgModal.style.display = "block";
        ingModal.innerHTML = ingredientes;
        contenedorVariedades.innerHTML = "";
        contenedorVariedades.style.display = "none";
    }

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// 4. Filtros por categoría
function filtrarCategoria(cat) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');

    const filtrados = (cat === 'todos')
        ? listaCocteles
        : listaCocteles.filter(c => c.categoria === cat);

    renderCocteles(filtrados);
}

// 5. Buscador
document.getElementById('buscador').addEventListener('input', (e) => {
    const busqueda = e.target.value.toLowerCase();
    const filtrados = listaCocteles.filter(c =>
        c.nombre.toLowerCase().includes(busqueda)
    );
    renderCocteles(filtrados);
});

// 6. Eventos de cierre y carga inicial
window.onclick = function (event) {
    const modal = document.getElementById("modal-coctel");
    if (event.target == modal || event.target.classList.contains('close-modal')) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCocteles(listaCocteles);
});