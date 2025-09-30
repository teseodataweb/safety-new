// Script para cargar TODOS los productos de AP Safety desde el JSON
// Este archivo procesará los 91 productos extraídos

// Función para cargar productos desde el archivo JSON
async function loadAllProductsFromJSON() {
    try {
        const response = await fetch('productos_ap_safety.json');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error cargando productos:', error);
        return [];
    }
}

// Función para procesar y normalizar los datos del JSON
function processProductData(rawProduct) {
    // Generar ID único basado en el nombre
    const id = rawProduct.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Determinar categoría basada en tipo
    let category = 'mascarilla-desechable';
    const tipo = rawProduct.tipo_categoria.toLowerCase();

    if (tipo.includes('niño') || tipo.includes('infantil')) {
        category = 'respirador-infantil';
    } else if (tipo.includes('reutilizable')) {
        category = 'respirador-reutilizable';
    } else if (tipo.includes('filtro') || tipo.includes('cartucho')) {
        category = 'filtros-cartuchos';
    } else if (tipo.includes('lente') || tipo.includes('visual')) {
        category = 'proteccion-visual';
    } else if (tipo.includes('auditiv') || tipo.includes('oído') || tipo.includes('tapón')) {
        category = 'proteccion-auditiva';
    } else if (tipo.includes('guante')) {
        category = 'guantes';
    } else if (tipo.includes('casco')) {
        category = 'cascos';
    } else if (tipo.includes('calzado') || tipo.includes('bota')) {
        category = 'calzado-seguridad';
    } else if (tipo.includes('traje') || tipo.includes('overol')) {
        category = 'ropa-proteccion';
    } else if (tipo.includes('arnes') || tipo.includes('altura')) {
        category = 'proteccion-alturas';
    }

    // Extraer certificaciones del texto
    const certifications = [];
    const textoCompleto = (rawProduct.texto_adicional + ' ' + rawProduct.caracteristicas + ' ' + rawProduct.aplicaciones).toUpperCase();

    if (textoCompleto.includes('N95')) certifications.push('N95');
    if (textoCompleto.includes('N99')) certifications.push('N99');
    if (textoCompleto.includes('N100')) certifications.push('N100');
    if (textoCompleto.includes('P95')) certifications.push('P95');
    if (textoCompleto.includes('P100')) certifications.push('P100');
    if (textoCompleto.includes('R95')) certifications.push('R95');
    if (textoCompleto.includes('NIOSH')) certifications.push('NIOSH');
    if (textoCompleto.includes('NOM-116')) certifications.push('NOM-116-STPS-2009');
    if (textoCompleto.includes('NMX-S-054')) certifications.push('NMX-S-054-SCFI-2013');
    if (textoCompleto.includes('ANSI')) certifications.push('ANSI');
    if (textoCompleto.includes('ISO')) certifications.push('ISO');
    if (textoCompleto.includes('CE')) certifications.push('CE');

    // Limpiar y formatear características
    let features = rawProduct.caracteristicas || '';
    if (features.includes('\n')) {
        features = features.split('\n').filter(f => f.trim()).join('. ');
    }

    // Limpiar aplicaciones
    let applications = rawProduct.aplicaciones || '';
    if (applications.includes('\n')) {
        applications = applications.split('\n').filter(a => a.trim()).join('. ');
    }

    return {
        id: id,
        name: rawProduct.nombre,
        category: category,
        type: rawProduct.tipo_categoria,
        protection: rawProduct.proteccion || 'Protección especializada',
        applications: applications,
        features: features,
        videoUrl: rawProduct.url_video || '',
        pdfUrl: rawProduct.url_ficha_tecnica || '',
        certification: certifications,
        image: `assets/images/products/${id}.jpg`,
        rawText: rawProduct.texto_adicional || '',
        advantages: rawProduct.ventajas || ''
    };
}

// Función para agrupar productos por categoría
function groupProductsByCategory(products) {
    const grouped = {
        'mascarilla-desechable': [],
        'respirador-infantil': [],
        'respirador-reutilizable': [],
        'filtros-cartuchos': [],
        'proteccion-visual': [],
        'proteccion-auditiva': [],
        'guantes': [],
        'cascos': [],
        'calzado-seguridad': [],
        'ropa-proteccion': [],
        'proteccion-alturas': [],
        'otros': []
    };

    products.forEach(product => {
        if (grouped[product.category]) {
            grouped[product.category].push(product);
        } else {
            grouped['otros'].push(product);
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

    return `
        <div class="col-xl-4 col-lg-6 col-md-6 product-item"
             data-category="${product.category}"
             data-id="${product.id}"
             data-certifications="${product.certification.join(' ')}">
            <div class="single-product-style1">
                <div class="single-product-style1__img">
                    <img src="${product.image}"
                         alt="${product.name}"
                         onerror="this.src='assets/images/shop/shop-product-1-1.jpg'">
                    <img src="${product.image}"
                         alt="${product.name}"
                         onerror="this.src='assets/images/shop/shop-product-1-1.jpg'">
                    ${product.certification.length > 0 ? `
                        <ul class="single-product-style1__overlay">
                            <li><p>${product.certification[0]}</p></li>
                        </ul>
                    ` : ''}
                </div>
                <div class="single-product-style1__content">
                    <div class="single-product-style1__review">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <h4 class="single-product-style1__title">
                        <a href="#" onclick="showProductDetail('${product.id}'); return false;">
                            ${product.name}
                        </a>
                    </h4>
                    <p class="single-product-style1__price" style="color: var(--ap-verde-corporativo); font-weight: 600; font-size: 14px;">
                        ${product.protection}
                    </p>
                    <div style="margin: 10px 0;">
                        ${certBadges}
                    </div>
                    <p style="font-size: 12px; color: #666; line-height: 1.4; height: 40px; overflow: hidden;">
                        ${product.features ? product.features.substring(0, 80) + '...' : product.type}
                    </p>
                    <ul class="single-product-style1__info">
                        ${product.pdfUrl ? `
                            <li>
                                <a href="${product.pdfUrl}" target="_blank" title="Ficha Técnica">
                                    <i class="fa fa-file-pdf"></i>
                                </a>
                            </li>
                        ` : ''}
                        ${product.videoUrl ? `
                            <li>
                                <a href="${product.videoUrl}" target="_blank" title="Ver Video">
                                    <i class="fa fa-play-circle"></i>
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

    // Crear modal con diseño mejorado
    const modalHTML = `
        <div class="product-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.3s ease;">
            <div style="background: white; max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto; border-radius: 15px; position: relative; animation: slideUp 0.3s ease;">
                <!-- Header con imagen -->
                <div style="background: linear-gradient(135deg, var(--ap-verde-corporativo), var(--ap-verde-oscuro)); color: white; padding: 30px; border-radius: 15px 15px 0 0; position: relative;">
                    <button onclick="this.closest('.product-modal').remove()" style="position: absolute; top: 20px; right: 20px; background: white; color: var(--ap-verde-corporativo); border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center;">×</button>
                    <h2 style="margin: 0; font-size: 32px;">${product.name}</h2>
                    <p style="margin-top: 10px; opacity: 0.9; font-size: 18px;">${product.type}</p>
                </div>

                <!-- Contenido -->
                <div style="padding: 30px;">
                    <!-- Nivel de protección -->
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                        <h4 style="color: var(--ap-verde-corporativo); margin: 0 0 10px 0; font-size: 18px;">
                            <i class="fa fa-shield-alt"></i> Nivel de Protección
                        </h4>
                        <p style="font-size: 20px; color: #333; margin: 0; font-weight: 600;">${product.protection}</p>
                    </div>

                    <!-- Certificaciones -->
                    ${product.certification && product.certification.length > 0 ? `
                        <div style="margin-bottom: 25px;">
                            <h4 style="color: #333; margin-bottom: 15px; font-size: 18px;">
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

                    <!-- Aplicaciones -->
                    ${product.applications ? `
                        <div style="margin-bottom: 25px;">
                            <h4 style="color: #333; margin-bottom: 15px; font-size: 18px;">
                                <i class="fa fa-industry"></i> Aplicaciones
                            </h4>
                            <p style="line-height: 1.8; color: #666; background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                ${product.applications}
                            </p>
                        </div>
                    ` : ''}

                    <!-- Características -->
                    ${product.features ? `
                        <div style="margin-bottom: 25px;">
                            <h4 style="color: #333; margin-bottom: 15px; font-size: 18px;">
                                <i class="fa fa-list-ul"></i> Características
                            </h4>
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                <p style="line-height: 1.8; color: #666; margin: 0; white-space: pre-line;">
                                    ${product.features}
                                </p>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Ventajas adicionales -->
                    ${product.advantages ? `
                        <div style="margin-bottom: 25px;">
                            <h4 style="color: #333; margin-bottom: 15px; font-size: 18px;">
                                <i class="fa fa-star"></i> Ventajas
                            </h4>
                            <p style="line-height: 1.8; color: #666;">
                                ${product.advantages}
                            </p>
                        </div>
                    ` : ''}

                    <!-- Botones de acción -->
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 30px; padding-top: 30px; border-top: 2px solid #e0e0e0;">
                        ${product.pdfUrl ? `
                            <a href="${product.pdfUrl}" target="_blank" style="background: var(--ap-verde-corporativo); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; font-weight: 600; transition: all 0.3s;">
                                <i class="fa fa-file-pdf"></i> Descargar Ficha Técnica
                            </a>
                        ` : ''}
                        ${product.videoUrl ? `
                            <a href="${product.videoUrl}" target="_blank" style="background: white; color: var(--ap-verde-corporativo); border: 2px solid var(--ap-verde-corporativo); padding: 15px 30px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; font-weight: 600; transition: all 0.3s;">
                                <i class="fa fa-play-circle"></i> Ver Video
                            </a>
                        ` : ''}
                        <a href="contact.html" style="background: #333; color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; font-weight: 600; transition: all 0.3s;">
                            <i class="fa fa-envelope"></i> Solicitar Cotización
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
    renderProductHTML
};