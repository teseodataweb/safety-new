document.addEventListener("DOMContentLoaded", function () {
    // Esperar a que se carguen los productos o el DOM completamente
    setTimeout(() => {
        const hash = window.location.hash.substring(1); // Ejemplo: "cascos", "guantes", etc.

        if (hash) {
            // Quitar clase "active" de todos los tabs
            document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));

            // Activar el tab correspondiente
            const targetTab = document.querySelector(`.category-tab[data-category="${hash}"]`);
            if (targetTab) {
                targetTab.classList.add('active');

                // Simular clic para activar el filtrado visual (si tu script lo maneja con click)
                targetTab.click();
            }

            // Ejecutar función de filtrado directamente si existe
            if (typeof filterProducts === "function") {
                filterProducts(hash);
            }

            // Hacer scroll hacia el contenedor de productos después de aplicar el filtro
            const productsSection = document.getElementById("productos_contenedor");
            if (productsSection) {
                // Esperar un momento para que se rendericen los productos antes de bajar
                setTimeout(() => {
                    productsSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    // Opcional: ajustar la posición para dejar un pequeño espacio superior
                    window.scrollBy(0, -100); // mueve 100px hacia arriba
                }, 600);
            }
        }
    }, 500); // medio segundo de espera inicial
});

