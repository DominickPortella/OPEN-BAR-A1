(function () {
    const aplicarLogica = () => {
        const btn = document.getElementById('menu-toggle');
        const menu = document.querySelector('.nav-menu'); // Usamos selector de clase por seguridad

        if (btn && menu) {
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle simultáneo para sincronizar X y Panel
                const isActive = btn.classList.toggle('active');
                menu.classList.toggle('active');

                // UX: Evita que el usuario haga scroll en el fondo negro
                document.body.style.overflow = isActive ? 'hidden' : 'auto';
            };

            // Cerrar menú al tocar un enlace
            menu.querySelectorAll('a').forEach(link => {
                link.onclick = () => {
                    btn.classList.remove('active');
                    menu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                };
            });
            return true;
        }
        return false;
    };

    // Reintentar hasta que el header cargue (máximo 2 segundos)
    let intentos = 0;
    const interval = setInterval(() => {
        if (aplicarLogica() || intentos > 20) {
            clearInterval(interval);
        }
        intentos++;
    }, 100);
})();