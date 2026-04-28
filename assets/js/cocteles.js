function abrirModal(titulo, imagen, ingredientes, variedades = null) {
    const modal = document.getElementById("modal-coctel");
    const tituloModal = document.getElementById("modal-titulo");
    const imgModal = document.getElementById("modal-img");
    const ingModal = document.getElementById("modal-ingredientes");
    const contenedorVariedades = document.querySelector(".lista-variedades");

    // Reiniciamos el contenido del modal
    tituloModal.innerText = titulo;
    imgModal.src = imagen;

    // Si hay variedades (Pisco Sour, Margarita, etc.), ocultamos la imagen principal del modal
    if (variedades) {
        imgModal.style.display = "none";
        ingModal.innerHTML = ""; // Limpiamos ingredientes generales

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
        // Cóctel simple: mostramos imagen principal e ingredientes generales
        imgModal.style.display = "block";
        ingModal.innerHTML = ingredientes;
        contenedorVariedades.innerHTML = "";
        contenedorVariedades.style.display = "none";
    }

    modal.style.display = "block";

    document.body.style.overflow = "hidden";
}

// Cierre corregido: Detecta clicks en la X o fuera del modal
window.onclick = function (event) {
    const modal = document.getElementById("modal-coctel");
    if (event.target == modal || event.target.classList.contains('close-modal')) {
        modal.style.display = "none";
        // Devolvemos el scroll
        document.body.style.overflow = "auto";
    }
}