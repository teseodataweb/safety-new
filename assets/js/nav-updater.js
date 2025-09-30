// Script para actualizar dinámicamente los menús de navegación con categorías reales del catálogo
// Este script debe incluirse después de products-loader.js

(function() {
    'use strict';

    // Categorías principales de productos EPP
    const productCategories = [
        { id: 'all', name: 'Catálogo Completo', href: 'products.html' },
        { id: 'mascarilla-desechable', name: 'Mascarillas y Respiradores', href: 'products.html?category=mascarilla-desechable' },
        { id: 'respirador-reutilizable', name: 'Respiradores Reutilizables', href: 'products.html?category=respirador-reutilizable' },
        { id: 'filtros-cartuchos', name: 'Filtros y Cartuchos', href: 'products.html?category=filtros-cartuchos' },
        { id: 'proteccion-visual', name: 'Protección Visual', href: 'products.html?category=proteccion-visual' },
        { id: 'proteccion-auditiva', name: 'Protección Auditiva', href: 'products.html?category=proteccion-auditiva' },
        { id: 'guantes', name: 'Guantes de Seguridad', href: 'products.html?category=guantes' },
        { id: 'cascos', name: 'Cascos de Seguridad', href: 'products.html?category=cascos' },
        { id: 'calzado-seguridad', name: 'Calzado de Seguridad', href: 'products.html?category=calzado-seguridad' },
        { id: 'ropa-proteccion', name: 'Ropa de Protección', href: 'products.html?category=ropa-proteccion' },
        { id: 'proteccion-alturas', name: 'Protección para Alturas', href: 'products.html?category=proteccion-alturas' }
    ];

    // Función para actualizar el submenú de productos
    function updateProductsSubmenu() {
        // Buscar todos los elementos dropdown de productos
        const productDropdowns = document.querySelectorAll('.main-menu__list li.dropdown');

        productDropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            if (link && (link.textContent.includes('Productos') || link.href.includes('products'))) {
                // Crear nuevo submenú
                const submenu = dropdown.querySelector('ul.shadow-box');
                if (submenu) {
                    // Limpiar submenú actual
                    submenu.innerHTML = '';

                    // Agregar categorías actualizadas
                    productCategories.forEach(category => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.href = category.href;
                        a.textContent = category.name;

                        // Agregar evento para pasar categoría como parámetro
                        if (category.id !== 'all') {
                            a.addEventListener('click', function(e) {
                                e.preventDefault();
                                window.location.href = category.href;
                            });
                        }

                        li.appendChild(a);
                        submenu.appendChild(li);
                    });
                }
            }
        });
    }

    // Función para actualizar enlaces de productos en toda la página
    function updateProductLinks() {
        // Actualizar enlaces que apunten a productos específicos
        const productLinks = document.querySelectorAll('a[href*="product"], a[href*="respirador"], a[href*="mascarilla"]');

        productLinks.forEach(link => {
            // Si el enlace contiene texto relacionado con productos
            const linkText = link.textContent.toLowerCase();

            if (linkText.includes('mascarilla') || linkText.includes('n95')) {
                link.href = 'products.html?category=mascarilla-desechable';
            } else if (linkText.includes('respirador')) {
                link.href = 'products.html?category=respirador-reutilizable';
            } else if (linkText.includes('guante')) {
                link.href = 'products.html?category=guantes';
            } else if (linkText.includes('casco')) {
                link.href = 'products.html?category=cascos';
            } else if (linkText.includes('lente') || linkText.includes('visual')) {
                link.href = 'products.html?category=proteccion-visual';
            } else if (linkText.includes('auditiv') || linkText.includes('oído')) {
                link.href = 'products.html?category=proteccion-auditiva';
            } else if (linkText.includes('calzado') || linkText.includes('bota')) {
                link.href = 'products.html?category=calzado-seguridad';
            }
        });
    }

    // Función para actualizar botones CTA (Call to Action)
    function updateCTAButtons() {
        // Buscar botones que enlacen a productos
        const ctaButtons = document.querySelectorAll('.thm-btn, .btn-primary, .btn-secondary');

        ctaButtons.forEach(button => {
            const buttonText = button.textContent.toLowerCase();

            // Si el botón dice "Ver Productos" o similar
            if (buttonText.includes('producto') || buttonText.includes('catálogo')) {
                if (!button.href || button.href === '#') {
                    button.href = 'products.html';
                }
            }

            // Si el botón dice "Cotizar" o "Solicitar"
            if (buttonText.includes('cotiz') || buttonText.includes('solicit')) {
                if (!button.href || button.href === '#') {
                    button.href = 'contact.html';
                }
            }

            // Si es un botón de descarga de catálogo
            if (buttonText.includes('descargar') && buttonText.includes('catálogo')) {
                button.setAttribute('download', '');
                if (!button.href || button.href === '#') {
                    button.href = 'assets/downloads/catalogo-ap-safety-2024.pdf';
                }
            }
        });
    }

    // Función para procesar parámetros de URL en la página de productos
    function handleProductsPageParams() {
        // Solo ejecutar en la página de productos
        if (!window.location.pathname.includes('products.html')) return;

        // Obtener parámetros de URL
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        const searchParam = urlParams.get('search');

        if (categoryParam) {
            // Esperar a que el DOM esté listo
            setTimeout(() => {
                // Buscar y activar la pestaña de categoría correspondiente
                const categoryTabs = document.querySelectorAll('.category-tab');
                categoryTabs.forEach(tab => {
                    if (tab.dataset.category === categoryParam) {
                        tab.click();
                    }
                });
            }, 500);
        }

        if (searchParam) {
            // Establecer término de búsqueda
            const searchInput = document.getElementById('product-search');
            if (searchInput) {
                searchInput.value = decodeURIComponent(searchParam);
                // Disparar evento de búsqueda
                searchInput.dispatchEvent(new Event('input'));
            }
        }
    }

    // Función para actualizar el menú móvil
    function updateMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-nav__content .main-menu__list');
        if (!mobileMenu) return;

        // Clonar las actualizaciones del menú principal al móvil
        const mainMenu = document.querySelector('.main-menu__wrapper .main-menu__list');
        if (mainMenu) {
            mobileMenu.innerHTML = mainMenu.innerHTML;
        }
    }

    // Función para agregar breadcrumbs dinámicos
    function updateBreadcrumbs() {
        const breadcrumbs = document.querySelector('.thm-breadcrumb');
        if (!breadcrumbs) return;

        // Obtener la página actual
        const currentPage = window.location.pathname.split('/').pop();

        // Si estamos en productos con categoría
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');

        if (currentPage === 'products.html' && categoryParam) {
            const category = productCategories.find(cat => cat.id === categoryParam);
            if (category) {
                // Actualizar último elemento del breadcrumb
                const lastCrumb = breadcrumbs.querySelector('li:last-child');
                if (lastCrumb) {
                    lastCrumb.textContent = category.name;
                }
            }
        }
    }

    // Función para agregar enlaces rápidos en el footer
    function updateFooterLinks() {
        const footerCategories = document.querySelector('.footer-widget__services ul');
        if (!footerCategories) return;

        // Limpiar enlaces actuales
        footerCategories.innerHTML = '';

        // Agregar categorías principales
        const mainCategories = productCategories.slice(1, 5); // Primeras 4 categorías después de "Todos"
        mainCategories.forEach(category => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = category.href;
            a.textContent = category.name;
            li.appendChild(a);
            footerCategories.appendChild(li);
        });
    }

    // Función principal de inicialización
    function initNavUpdater() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }

    function init() {
        updateProductsSubmenu();
        updateProductLinks();
        updateCTAButtons();
        handleProductsPageParams();
        updateMobileMenu();
        updateBreadcrumbs();
        updateFooterLinks();

        // Observar cambios en el DOM para menús cargados dinámicamente
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    updateProductsSubmenu();
                    updateMobileMenu();
                }
            });
        });

        // Observar el body para cambios
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Exportar funciones para uso externo
    window.APNavUpdater = {
        init: initNavUpdater,
        updateProductsSubmenu,
        updateProductLinks,
        updateCTAButtons,
        handleProductsPageParams
    };

    // Inicializar automáticamente
    initNavUpdater();

})();