// Script para cargar TODOS los productos de AP Safety desde el JSON
// Actualizado para 591 productos con nueva estructura
// v2.0 - Soporte para imágenes reales del sitio actual

// Mapeo de categorías del JSON a categorías de filtro
const categoryMapping = {
    'Equipos SCBA y Respiración Autónoma': 'equipos-scba',
    'Respiradores Desechables N95/P95': 'respiradores-n95',
    'Respiradores Reutilizables': 'respiradores-reutilizables',
    'Mascarillas Desechables': 'mascarillas',
    'Mascarillas Infantiles': 'mascarillas-infantiles',
    'Cubrebocas Desechables': 'cubrebocas',
    'Guantes de Protección': 'guantes',
    'Ropa de Protección': 'ropa-proteccion',
    'Calzado de Seguridad': 'calzado',
    'Accesorios para Cabeza': 'cabeza',
    'Protección Visual': 'proteccion-visual',
    'Protección Auditiva': 'proteccion-auditiva',
    'Fajas y Soporte Lumbar': 'fajas',
    'Señalización y Vialidad': 'senalizacion',
    'Protección de Brazos': 'ropa-proteccion',
    'Accesorios y Refacciones': 'accesorios',
    'Otros': 'accesorios'
};

// Mapeo de categorías a iconos Font Awesome (FA5 Free compatible)
const categoryIcons = {
    'equipos-scba': 'fa-lungs',                    // Equipos de respiración autónoma
    'respiradores-n95': 'fa-mask',                 // Respiradores desechables N95/P95
    'respiradores-reutilizables': 'fa-mask',       // Respiradores reutilizables
    'mascarillas': 'fa-shield-alt',                // Mascarillas desechables
    'mascarillas-infantiles': 'fa-child',          // Mascarillas infantiles
    'cubrebocas': 'fa-mask',                       // Cubrebocas desechables
    'guantes': 'fa-mitten',                        // Guantes de protección
    'ropa-proteccion': 'fa-tshirt',                // Ropa de protección
    'calzado': 'fa-shoe-prints',                   // Calzado de seguridad
    'cabeza': 'fa-hard-hat',                       // Accesorios para cabeza
    'proteccion-visual': 'fa-glasses',             // Protección visual
    'proteccion-auditiva': 'fa-deaf',              // Protección auditiva
    'fajas': 'fa-band-aid',                        // Fajas y soporte lumbar
    'senalizacion': 'fa-exclamation-triangle',     // Señalización
    'accesorios': 'fa-cogs'                        // Accesorios y refacciones
};

// Función para obtener icono por categoría
function getCategoryIcon(category) {
    return categoryIcons[category] || 'fa-box';
}

// Función para cargar productos desde el archivo JSON (con imágenes asignadas)
async function loadAllProductsFromJSON() {
    try {
        // Intentar cargar el JSON con imágenes primero
        let response = await fetch('productos_ap_safety_con_imagenes.json');
        if (!response.ok) {
            // Fallback al JSON original
            response = await fetch('productos_ap_safety.json');
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error cargando productos:', error);
        return [];
    }
}

// Función para procesar y normalizar los datos del JSON (nueva estructura)
function processProductData(rawProduct) {
    // Generar ID único
    const id = rawProduct.clave || rawProduct.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Mapear categoría
    const category = categoryMapping[rawProduct.categoria] || 'accesorios';

    // Procesar certificaciones (ya vienen como array en el nuevo JSON)
    const certifications = rawProduct.certificaciones || [];

    // Determinar imagen: usar la asignada del JSON o null
    const assignedImage = rawProduct.imagen ? `assets/images/products/${rawProduct.imagen}` : null;
    const hasImage = assignedImage !== null;

    return {
        id: id,
        numericId: rawProduct.id,
        name: rawProduct.nombre,
        code: rawProduct.clave,
        category: category,
        categoryName: rawProduct.categoria,
        line: rawProduct.linea,
        type: rawProduct.tipo,
        description: rawProduct.descripcion,
        certification: certifications,
        plant: rawProduct.planta,
        techSheet: rawProduct.ficha_tecnica,
        packagingUnit: rawProduct.envase_pza,
        packagingTotal: rawProduct.embalaje,
        image: assignedImage,
        hasImage: hasImage,
        // Campos de compatibilidad con estructura anterior
        protection: certifications.length > 0 ? certifications.join(', ') : 'Protección especializada',
        applications: rawProduct.descripcion,
        features: `Línea: ${rawProduct.linea}. ${rawProduct.descripcion}`,
        videoUrl: '',
        pdfUrl: rawProduct.ficha_tecnica && rawProduct.ficha_tecnica.startsWith('IT-') ? '' : rawProduct.ficha_tecnica,
        advantages: rawProduct.tipo === 'Marca AP' ? 'Producto fabricado por AP Mascarillas con los más altos estándares de calidad.' : 'Producto comercializado con garantía AP Safety.'
    };
}

// Función para agrupar productos por categoría
function groupProductsByCategory(products) {
    const grouped = {};

    // Inicializar todas las categorías
    Object.values(categoryMapping).forEach(cat => {
        if (!grouped[cat]) grouped[cat] = [];
    });
    grouped['all'] = [];

    products.forEach(product => {
        grouped['all'].push(product);
        if (grouped[product.category]) {
            grouped[product.category].push(product);
        }
    });

    return grouped;
}

// Función para renderizar un producto en HTML
function renderProductHTML(product) {
    const certBadges = product.certification.length > 0
        ? product.certification.slice(0, 2).map(cert =>
            `<span class="badge" style="background: var(--ap-verde-corporativo); color: white; padding: 3px 8px; border-radius: 12px; font-size: 10px; margin-right: 5px;">${cert}</span>`
          ).join('')
        : '';

    const typeBadge = product.type === 'Marca AP'
        ? '<span class="badge" style="background: #014C3F; color: white; padding: 3px 8px; border-radius: 12px; font-size: 10px;">Marca AP</span>'
        : '<span class="badge" style="background: #666; color: white; padding: 3px 8px; border-radius: 12px; font-size: 10px;">Distribuido</span>';

    // Obtener el icono de la categoría
    const categoryIcon = getCategoryIcon(product.category);

    // Determinar contenido de imagen: imagen real o icono
    let imageContent;
    if (product.hasImage && product.image) {
        imageContent = `
            <img src="${product.image}"
                 alt="${product.name}"
                 style="width: 100%; height: 200px; object-fit: contain; padding: 10px;"
                 onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\\'fas ${categoryIcon}\\' style=\\'font-size: 80px; color: var(--ap-verde-corporativo); opacity: 0.8;\\'></i>';">
        `;
    } else {
        imageContent = `<i class="fas ${categoryIcon}" style="font-size: 80px; color: var(--ap-verde-corporativo); opacity: 0.8;"></i>`;
    }

    return `
        <div class="col-xl-4 col-lg-6 col-md-6 product-item"
             data-category="${product.category}"
             data-id="${product.id}"
             data-certifications="${product.certification.join(' ')}"
             data-type="${product.type}">
            <div class="single-product-style1">
                <div class="single-product-style1__img product-icon-container" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); display: flex; align-items: center; justify-content: center; min-height: 200px; position: relative;">
                    ${imageContent}
                    ${product.certification.length > 0 ? `
                        <ul class="single-product-style1__overlay" style="position: absolute; top: 10px; left: 10px;">
                            <li><p>${product.certification[0]}</p></li>
                        </ul>
                    ` : ''}
                </div>
                <div class="single-product-style1__content">
                    <div style="margin-bottom: 8px;">
                        ${typeBadge}
                    </div>
                    <h4 class="single-product-style1__title" style="font-size: 14px; line-height: 1.3; height: 40px; overflow: hidden;">
                        <a href="#" onclick="showProductDetail('${product.id}'); return false;">
                            ${product.name}
                        </a>
                    </h4>
                    <p class="single-product-style1__price" style="color: var(--ap-verde-corporativo); font-weight: 600; font-size: 12px; margin: 5px 0;">
                        ${product.categoryName}
                    </p>
                    <div style="margin: 8px 0; min-height: 25px;">
                        ${certBadges}
                    </div>
                    <p style="font-size: 11px; color: #666; line-height: 1.3; height: 30px; overflow: hidden;">
                        Código: ${product.code} | ${product.line}
                    </p>
                    <ul class="single-product-style1__info">
                        ${product.pdfUrl ? `
                            <li>
                                <a href="${product.pdfUrl}" target="_blank" title="Ficha Técnica">
                                    <i class="fa fa-file-pdf"></i>
                                </a>
                            </li>
                        ` : ''}
                        <li>
                            <a href="#" onclick="showProductDetail('${product.id}'); return false;" title="Ver Detalles">
                                <i class="fa fa-eye"></i>
                            </a>
                        </li>
                        <li>
                            <a href="contact.html" title="Solicitar Cotización">
                                <i class="fa fa-envelope"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Función para mostrar detalles del producto en modal
window.showProductDetail = function(productId) {
    const product = window.allProducts.find(p => p.id === productId);
    if (!product) return;

    // Determinar contenido de imagen para el modal
    const categoryIcon = getCategoryIcon(product.category);
    let modalImageContent;
    if (product.hasImage && product.image) {
        modalImageContent = `
            <div style="background: white; padding: 20px; text-align: center; border-radius: 10px; margin-bottom: 20px;">
                <img src="${product.image}"
                     alt="${product.name}"
                     style="max-width: 100%; max-height: 250px; object-fit: contain;"
                     onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\\'fas ${categoryIcon}\\' style=\\'font-size: 100px; color: var(--ap-verde-corporativo); opacity: 0.5;\\'></i>';">
            </div>
        `;
    } else {
        modalImageContent = '';
    }

    // Crear modal con diseño mejorado
    const modalHTML = `
        <div class="product-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.3s ease;">
            <div style="background: white; max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto; border-radius: 15px; position: relative; animation: slideUp 0.3s ease;">
                <!-- Header con imagen -->
                <div style="background: linear-gradient(135deg, var(--ap-verde-corporativo), var(--ap-verde-oscuro)); color: white; padding: 30px; border-radius: 15px 15px 0 0; position: relative;">
                    <button onclick="this.closest('.product-modal').remove()" style="position: absolute; top: 20px; right: 20px; background: white; color: var(--ap-verde-corporativo); border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center;">×</button>
                    <span style="background: ${product.type === 'Marca AP' ? '#fff' : 'rgba(255,255,255,0.3)'}; color: ${product.type === 'Marca AP' ? 'var(--ap-verde-corporativo)' : '#fff'}; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 600;">${product.type}</span>
                    <h2 style="margin: 15px 0 0 0; font-size: 28px;">${product.name}</h2>
                    <p style="margin-top: 10px; opacity: 0.9; font-size: 16px;">Código: ${product.code} | Línea: ${product.line}</p>
                </div>

                <!-- Contenido -->
                <div style="padding: 30px;">
                    <!-- Imagen del producto -->
                    ${modalImageContent}

                    <!-- Categoría y Planta -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 10px;">
                            <h4 style="color: var(--ap-verde-corporativo); margin: 0 0 8px 0; font-size: 14px;">
                                <i class="fa fa-tag"></i> Categoría
                            </h4>
                            <p style="font-size: 16px; color: #333; margin: 0; font-weight: 600;">${product.categoryName}</p>
                        </div>
                        ${product.plant ? `
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 10px;">
                            <h4 style="color: var(--ap-verde-corporativo); margin: 0 0 8px 0; font-size: 14px;">
                                <i class="fa fa-industry"></i> Planta de Fabricación
                            </h4>
                            <p style="font-size: 16px; color: #333; margin: 0; font-weight: 600;">${product.plant}</p>
                        </div>
                        ` : ''}
                    </div>

                    <!-- Descripción -->
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                        <h4 style="color: var(--ap-verde-corporativo); margin: 0 0 10px 0; font-size: 16px;">
                            <i class="fa fa-info-circle"></i> Descripción
                        </h4>
                        <p style="font-size: 15px; color: #333; margin: 0; line-height: 1.6;">${product.description}</p>
                    </div>

                    <!-- Certificaciones -->
                    ${product.certification && product.certification.length > 0 ? `
                        <div style="margin-bottom: 25px;">
                            <h4 style="color: #333; margin-bottom: 15px; font-size: 16px;">
                                <i class="fa fa-certificate"></i> Certificaciones
                            </h4>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                ${product.certification.map(cert => `
                                    <span style="background: var(--ap-verde-corporativo); color: white; padding: 8px 20px; border-radius: 25px; font-size: 14px; font-weight: 500;">
                                        <i class="fa fa-check-circle"></i> ${cert}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <!-- Información de empaque -->
                    ${product.packagingUnit || product.packagingTotal ? `
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            ${product.packagingUnit ? `
                            <div style="background: #e8f5e9; padding: 15px; border-radius: 10px; text-align: center;">
                                <i class="fa fa-box" style="font-size: 24px; color: var(--ap-verde-corporativo);"></i>
                                <p style="margin: 10px 0 0 0; font-weight: 600; color: #333;">Envase: ${product.packagingUnit} pzas</p>
                            </div>
                            ` : ''}
                            ${product.packagingTotal && product.packagingTotal !== '/' ? `
                            <div style="background: #e8f5e9; padding: 15px; border-radius: 10px; text-align: center;">
                                <i class="fa fa-boxes" style="font-size: 24px; color: var(--ap-verde-corporativo);"></i>
                                <p style="margin: 10px 0 0 0; font-weight: 600; color: #333;">Embalaje: ${product.packagingTotal} pzas</p>
                            </div>
                            ` : ''}
                        </div>
                    ` : ''}

                    <!-- Ficha técnica -->
                    ${product.techSheet ? `
                        <div style="background: #fff3e0; padding: 15px; border-radius: 10px; margin-bottom: 25px;">
                            <p style="margin: 0; color: #e65100;">
                                <i class="fa fa-file-alt"></i> <strong>Código de Ficha Técnica:</strong> ${product.techSheet}
                            </p>
                        </div>
                    ` : ''}

                    <!-- Botones de acción -->
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 30px; padding-top: 30px; border-top: 2px solid #e0e0e0;">
                        <a href="contact.html" style="background: var(--ap-verde-corporativo); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; font-weight: 600; transition: all 0.3s;">
                            <i class="fa fa-envelope"></i> Solicitar Cotización
                        </a>
                        <a href="tel:+525648401749" style="background: white; color: var(--ap-verde-corporativo); border: 2px solid var(--ap-verde-corporativo); padding: 15px 30px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; font-weight: 600; transition: all 0.3s;">
                            <i class="fa fa-phone"></i> Llamar Ahora
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Agregar estilos de animación si no existen
    if (!document.getElementById('modal-animations')) {
        const style = document.createElement('style');
        style.id = 'modal-animations';
        style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Cerrar modal con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.product-modal');
            if (modal) modal.remove();
        }
    });
};

// Variable global para almacenar todos los productos
window.allProducts = [];

// Exportar funciones para uso externo
window.APSafetyProducts = {
    loadAllProductsFromJSON,
    processProductData,
    groupProductsByCategory,
    renderProductHTML,
    categoryMapping,
    categoryIcons,
    getCategoryIcon
};
