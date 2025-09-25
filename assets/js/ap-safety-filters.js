// AP Safety - Sistema de Filtros para Catálogo de Productos
document.addEventListener('DOMContentLoaded', function() {

    // Inicialización de filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Manejo de eventos de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Agregar clase activa al botón actual
            this.classList.add('active');

            // Obtener categoría seleccionada
            const category = this.dataset.category;

            // Filtrar productos
            filterProducts(category);
        });
    });

    // Función para filtrar productos
    function filterProducts(category) {
        productCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('fade-in-up');
                }, 10);
            } else {
                if (card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('fade-in-up');
                    }, 10);
                } else {
                    card.classList.remove('fade-in-up');
                    card.style.display = 'none';
                }
            }
        });

        // Actualizar contador de productos
        updateProductCount();
    }

    // Función para actualizar contador
    function updateProductCount() {
        const visibleProducts = document.querySelectorAll('.product-card[style*="block"]').length ||
                               document.querySelectorAll('.product-card:not([style*="none"])').length;
        const counter = document.querySelector('.product-count');
        if (counter) {
            counter.textContent = `Mostrando ${visibleProducts} productos`;
        }
    }

    // Búsqueda de productos
    const searchInput = document.querySelector('#product-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();

            productCards.forEach(card => {
                const title = card.querySelector('.product-card__title').textContent.toLowerCase();
                const description = card.querySelector('.product-card__description').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            updateProductCount();
        });
    }

    // Ordenamiento de productos
    const sortSelect = document.querySelector('#product-sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const container = document.querySelector('.products-container');
            const products = Array.from(productCards);

            products.sort((a, b) => {
                switch(sortValue) {
                    case 'name-asc':
                        return a.querySelector('.product-card__title').textContent
                            .localeCompare(b.querySelector('.product-card__title').textContent);
                    case 'name-desc':
                        return b.querySelector('.product-card__title').textContent
                            .localeCompare(a.querySelector('.product-card__title').textContent);
                    case 'category':
                        return a.dataset.category.localeCompare(b.dataset.category);
                    default:
                        return 0;
                }
            });

            // Reordenar elementos en el DOM
            products.forEach(product => {
                container.appendChild(product);
            });
        });
    }

    // Modal para vista rápida
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            showQuickView(productId);
        });
    });

    // Función para mostrar vista rápida
    function showQuickView(productId) {
        // Aquí se implementaría la lógica para mostrar un modal con detalles del producto
        console.log('Mostrando vista rápida del producto:', productId);
    }

    // Inicializar contador al cargar
    updateProductCount();
});