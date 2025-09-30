// Base de datos completa de productos AP Safety
// Este archivo contiene TODOS los productos extraídos del catálogo

// Función para obtener productos desde localStorage o usar los predeterminados
function getProductsDatabase() {
    const storedProducts = localStorage.getItem('apSafetyProducts');
    if (storedProducts) {
        return JSON.parse(storedProducts);
    }
    return defaultProducts;
}

// Función para guardar productos en localStorage
function saveProductsDatabase(products) {
    localStorage.setItem('apSafetyProducts', JSON.stringify(products));
}

// Base de datos predeterminada con todos los productos
const defaultProducts = [
    {
        id: 'z5',
        name: 'Z5',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable',
        protection: 'Partículas no Tóxicas',
        applications: 'ALMIDÓN, ALUMINA, ALFALFA, BAUXITA, BENTONITA, CARBONATO DE CALCIO, CAOLÍN, CAUCHO, DIÓXIDO DE TITANIO, ESMERIL, ESTRATO DE ZINC, GRAFITO, MAGNESIA, MÁRMOL, POLVO DE VIDRIO, SAL, SILICIO, SACAROSA, YESO',
        features: 'Confiable para partículas no tóxicas con exposición por debajo de 15mg/m³. Fácil respiración y comunicación. Diseño que permite visión clara y uso con lentes de seguridad. Ajuste perfecto al contorno facial. Banda elástica indeformable. Económica y desechable (duración: 1 turno de trabajo). Empaque: 50 mascarillas',
        videoUrl: 'https://youtu.be/8jujTS9M9vE',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/Z5.pdf',
        certification: [],
        image: 'assets/images/products/z5.jpg'
    },
    {
        id: '8g',
        name: '8G',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable',
        protection: 'Partículas No Tóxicas',
        applications: 'Polvos molestos y partículas libres de aceite como madera, vidrio, harina, yeso, esmeril, fibras textiles, desperdicios, papel, cartón, granos. Aplicable a industrias como la alimenticia, hospitalaria y electrónica',
        features: 'Respirador sencillo purificador con clip nasal y doble liga. Totalmente anatómico. Medio filtrante para remover partículas mayores a 10 micras. Para polvos libres de aceite. Tamaño mediano adaptable a cualquier cara',
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/8G_8GV.pdf',
        certification: [],
        image: 'assets/images/products/8g.jpg'
    },
    {
        id: 'z6',
        name: 'Z6',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable',
        protection: 'Partículas Tóxicas',
        applications: 'Protección contra polvos derivados de procesos industriales: corte, pulido, lijado, molienda, barrido. Polvos minerales de hierro, aluminio, acero, harina, madera, cemento, fibras textiles, carbón, sílice',
        features: 'Medio filtrante electroestático de alta tecnología. Eficiencia mínima del 95%. No obstaculiza respiración. Desechable libre de mantenimiento. Elásticos resistentes a altas temperaturas. Compatible con otros EPP. Totalmente acojinado internamente',
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/Z6_Z6V.pdf',
        certification: ['N95'],
        image: 'assets/images/products/z6.jpg'
    },
    {
        id: 'z',
        name: 'Z',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable',
        protection: 'Partículas Extra Finas N99',
        applications: 'Protección contra humos, neblinas y polvos libres de aceite derivados de procesos como fundición, corte, molienda',
        features: 'Medio filtrante electroestático resistente al taponamiento. Eficiencia mínima del 99%. Anatómico y cómodo. Excelente retención de partículas. Totalmente hipoalergénico. Acojinado interno suave',
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/Z_ZV.pdf',
        certification: ['N99', 'NOM-116-STPS-2009', 'NMX-S-054-SCFI-2013'],
        image: 'assets/images/products/z.jpg'
    },
    {
        id: 'm10',
        name: 'M10',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable',
        protection: 'N95',
        applications: 'Protección contra polvos de procesos industriales: corte, pulido, lijado, molienda, barrido. Polvos minerales de hierro, aluminio, acero, harina, madera, cemento, fibras textiles, carbón, sílice',
        features: 'Medio filtrante electroestático de alta tecnología. Eficiencia mínima del 95%. Clip nasal plástico para sello confortable. Gran resistencia a la deformación por humedad. Compatible con otros EPP. No suministra oxígeno',
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/M10_M10V.pdf',
        certification: ['N95', 'NOM-116-STPS-1994'],
        image: 'assets/images/products/m10.jpg'
    },
    {
        id: 'm10v',
        name: 'M10V',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable con válvula',
        protection: 'N95',
        applications: 'Protección contra polvos de procesos industriales: corte, pulido, lijado, molienda, barrido. Polvos minerales de hierro, aluminio, acero, harina, madera, cemento, fibras textiles, carbón, sílice',
        features: 'Medio filtrante electroestático con eficiencia mínima del 95%. Válvula de exhalación para mayor frescura. Clip nasal plástico. Gran resistencia a la deformación. Compatible con otros EPP',
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/M10_M10V.pdf',
        certification: ['N95', 'NOM-116-STPS-2009', 'NMX-S-054-SCFI-2013'],
        image: 'assets/images/products/m10v.jpg'
    },
    {
        id: 'm10-mini',
        name: 'M10 Mini',
        category: 'respirador-infantil',
        type: 'Respirador facial para niño',
        protection: 'N95 con Carbón Activado',
        applications: 'Humos, neblinas y partículas libres de aceite. Procesos de fundición, corte con soplete, soldadura. Industria petroquímica, agricultura, aplicación de asfaltos. Protección contra humos metálicos y vapores orgánicos',
        features: 'Combinación de filtro electroestático (95% eficiencia) y carbón activado. Diseñado especialmente para niños. Para aplicaciones con pintura, barniz y agroquímicos',
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/M10_Mini.pdf',
        certification: ['N95', 'NOM-116-STPS-2009', 'NMX-S-054-SCFI-2013'],
        image: 'assets/images/products/m10-mini.jpg'
    },
    {
        id: 'm11',
        name: 'M11',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable',
        protection: 'P95',
        applications: 'Protección contra humos, neblinas y partículas con aceite. Procesos de fundición, soldadura, procesos industriales con neblinas de aceite, aplicación de agroquímicos, plaguicidas',
        features: 'Medio filtrante electroestático de alta tecnología. Eficiencia mínima del 95%. A prueba de aceite. Filtro resistente al taponamiento. Elásticos resistentes a altas temperaturas',
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/M11_M11V.pdf',
        certification: ['P95', 'NOM-116-STPS-2009', 'NMX-S-054-SCFI-2013'],
        image: 'assets/images/products/m11.jpg'
    },
    {
        id: 'm11v',
        name: 'M11V',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable con válvula',
        protection: 'P95',
        applications: 'Protección contra humos, neblinas y partículas con aceite. Procesos de fundición, soldadura, procesos industriales con neblinas de aceite, aplicación de agroquímicos, plaguicidas',
        features: 'Medio filtrante electroestático con eficiencia del 95%. A prueba de aceite. Válvula de exhalación para mayor frescura. Filtro resistente al taponamiento',
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/M11_M11V.pdf',
        certification: ['P95', 'NOM-116-STPS-2009', 'NMX-S-054-SCFI-2013'],
        image: 'assets/images/products/m11v.jpg'
    },
    {
        id: 'm14',
        name: 'M14',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable',
        protection: 'N95 con Carbón Activado',
        applications: 'Vapores orgánicos, pintura en spray, barniz, humos, neblinas y partículas libres de aceite. Procesos de fundición, corte, soldadura, aplicación de agroquímicos',
        features: 'Combinación de filtro N95 y carbón activado. Protección contra vapores orgánicos. Ideal para aplicaciones con pintura y barniz. Excelente para manejo de agroquímicos',
        videoUrl: '',
        pdfUrl: '',
        certification: ['N95'],
        image: 'assets/images/products/m14.jpg'
    },
    {
        id: 'z6v',
        name: 'Z6V',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable con válvula',
        protection: 'Partículas Tóxicas N95',
        applications: 'Protección contra polvos derivados de procesos industriales. Ideal para ambientes con alta temperatura. Trabajos que requieren esfuerzo físico prolongado',
        features: 'Eficiencia mínima del 95%. Válvula de exhalación que reduce calor y humedad. Mayor comodidad en trabajos pesados. Compatible con otros EPP',
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/Z6_Z6V.pdf',
        certification: ['N95'],
        image: 'assets/images/products/z6v.jpg'
    },
    {
        id: 'zv',
        name: 'ZV',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable con válvula',
        protection: 'Partículas Extra Finas N99',
        applications: 'Protección contra humos, neblinas y polvos libres de aceite. Procesos de fundición, corte, molienda. Ideal para exposiciones prolongadas',
        features: 'Eficiencia mínima del 99%. Válvula de exhalación para mayor confort. Resistente al taponamiento. Totalmente hipoalergénico',
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/Z_ZV.pdf',
        certification: ['N99', 'NOM-116-STPS-2009'],
        image: 'assets/images/products/zv.jpg'
    },
    {
        id: '8gv',
        name: '8GV',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable con válvula',
        protection: 'Partículas No Tóxicas',
        applications: 'Polvos molestos y partículas libres de aceite. Ideal para industrias alimenticia, hospitalaria y electrónica. Trabajos en ambientes calurosos',
        features: 'Respirador con válvula de exhalación. Clip nasal y doble liga. Medio filtrante para partículas mayores a 10 micras. Mayor comodidad respiratoria',
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/8G_8GV.pdf',
        certification: [],
        image: 'assets/images/products/8gv.jpg'
    },
    {
        id: 'm20',
        name: 'M20',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable',
        protection: 'N100',
        applications: 'Máxima protección contra partículas. Ambientes con alta concentración de contaminantes. Industria química y farmacéutica',
        features: 'Eficiencia mínima del 99.97%. Máximo nivel de filtración NIOSH. Protección contra partículas ultra finas. Diseño ergonómico avanzado',
        videoUrl: '',
        pdfUrl: '',
        certification: ['N100', 'NIOSH'],
        image: 'assets/images/products/m20.jpg'
    },
    {
        id: 'ap100',
        name: 'AP-100',
        category: 'respirador-reutilizable',
        type: 'Respirador de media cara',
        protection: 'Multifiltro',
        applications: 'Uso industrial general. Intercambiable con diferentes filtros. Aplicaciones químicas, pintura, soldadura',
        features: 'Respirador reutilizable de silicón. Válvulas de exhalación duales. Compatible con múltiples cartuchos. Arnés ajustable',
        videoUrl: '',
        pdfUrl: '',
        certification: ['NIOSH', 'NOM-116-STPS-2009'],
        image: 'assets/images/products/ap100.jpg'
    },
    {
        id: 'ap200',
        name: 'AP-200',
        category: 'respirador-reutilizable',
        type: 'Respirador de cara completa',
        protection: 'Multifiltro con protección facial',
        applications: 'Protección respiratoria y facial completa. Industria química pesada. Manejo de sustancias peligrosas',
        features: 'Visor de policarbonato anti-empañante. Sistema de filtros duales. Arnés de 5 puntos. Silicón hipoalergénico',
        videoUrl: '',
        pdfUrl: '',
        certification: ['NIOSH', 'ANSI Z87.1', 'NOM-116-STPS-2009'],
        image: 'assets/images/products/ap200.jpg'
    },
    {
        id: 'f100',
        name: 'Filtro F100',
        category: 'filtros-cartuchos',
        type: 'Filtro para partículas',
        protection: 'P100',
        applications: 'Compatible con respiradores AP-100 y AP-200. Protección contra partículas con o sin aceite',
        features: 'Eficiencia del 99.97%. Resistente a la degradación. Larga duración. Código de colores para fácil identificación',
        videoUrl: '',
        pdfUrl: '',
        certification: ['P100', 'NIOSH'],
        image: 'assets/images/products/f100.jpg'
    },
    {
        id: 'f200',
        name: 'Filtro F200',
        category: 'filtros-cartuchos',
        type: 'Cartucho para vapores orgánicos',
        protection: 'Vapores Orgánicos',
        applications: 'Pintura, barnices, solventes. Industria química. Procesos de impresión',
        features: 'Carbón activado de alta calidad. Indicador de saturación. Compatible con serie AP. Empaque hermético',
        videoUrl: '',
        pdfUrl: '',
        certification: ['NIOSH'],
        image: 'assets/images/products/f200.jpg'
    },
    {
        id: 'f300',
        name: 'Filtro F300',
        category: 'filtros-cartuchos',
        type: 'Cartucho para gases ácidos',
        protection: 'Gases Ácidos',
        applications: 'Industria química. Procesos con ácidos. Laboratorios',
        features: 'Protección contra gases ácidos. Indicador de vida útil. Alta capacidad de absorción. Sellado hermético',
        videoUrl: '',
        pdfUrl: '',
        certification: ['NIOSH'],
        image: 'assets/images/products/f300.jpg'
    },
    {
        id: 'f400',
        name: 'Filtro F400',
        category: 'filtros-cartuchos',
        type: 'Cartucho multigas',
        protection: 'Multigas',
        applications: 'Protección versátil. Mantenimiento industrial. Emergencias químicas',
        features: 'Protección contra múltiples contaminantes. Vapores orgánicos, gases ácidos y amoniaco. Máxima versatilidad',
        videoUrl: '',
        pdfUrl: '',
        certification: ['NIOSH'],
        image: 'assets/images/products/f400.jpg'
    }
];

// Categorías disponibles
const productCategories = [
    { id: 'all', name: 'Todos los productos', icon: 'fa-th' },
    { id: 'mascarilla-desechable', name: 'Mascarillas Desechables', icon: 'fa-head-side-mask' },
    { id: 'respirador-infantil', name: 'Respiradores Infantiles', icon: 'fa-child' },
    { id: 'respirador-reutilizable', name: 'Respiradores Reutilizables', icon: 'fa-mask' },
    { id: 'filtros-cartuchos', name: 'Filtros y Cartuchos', icon: 'fa-filter' },
    { id: 'n95', name: 'N95', icon: 'fa-shield-virus' },
    { id: 'n99', name: 'N99', icon: 'fa-shield-alt' },
    { id: 'n100', name: 'N100', icon: 'fa-shield' },
    { id: 'p95', name: 'P95', icon: 'fa-shield-virus' },
    { id: 'p100', name: 'P100', icon: 'fa-shield' },
    { id: 'valvula', name: 'Con Válvula', icon: 'fa-wind' },
    { id: 'carbon-activado', name: 'Carbón Activado', icon: 'fa-filter' }
];

// Función para obtener productos por categoría
function getProductsByCategory(category) {
    const products = getProductsDatabase();

    if (category === 'all') {
        return products;
    }

    return products.filter(product => {
        // Verificar categoría principal
        if (product.category === category) return true;

        // Verificar certificaciones
        if (product.certification) {
            if (category === 'n95' && product.certification.some(c => c.includes('N95'))) return true;
            if (category === 'n99' && product.certification.some(c => c.includes('N99'))) return true;
            if (category === 'n100' && product.certification.some(c => c.includes('N100'))) return true;
            if (category === 'p95' && product.certification.some(c => c.includes('P95'))) return true;
            if (category === 'p100' && product.certification.some(c => c.includes('P100'))) return true;
        }

        // Verificar si tiene válvula
        if (category === 'valvula' && (product.name.includes('V') || product.type.includes('válvula'))) return true;

        // Verificar carbón activado
        if (category === 'carbon-activado' &&
            (product.protection.toLowerCase().includes('carbón') ||
             product.features.toLowerCase().includes('carbón'))) return true;

        return false;
    });
}

// Función para buscar productos
function searchProducts(searchTerm) {
    const products = getProductsDatabase();
    const term = searchTerm.toLowerCase();

    return products.filter(product => {
        return product.name.toLowerCase().includes(term) ||
               product.protection.toLowerCase().includes(term) ||
               product.applications.toLowerCase().includes(term) ||
               product.features.toLowerCase().includes(term) ||
               (product.certification && product.certification.some(c => c.toLowerCase().includes(term)));
    });
}

// Función para agregar un nuevo producto
function addProduct(product) {
    const products = getProductsDatabase();

    // Generar ID único si no existe
    if (!product.id) {
        product.id = 'product_' + Date.now();
    }

    // Asegurar que tenga todos los campos necesarios
    const newProduct = {
        id: product.id,
        name: product.name || '',
        category: product.category || 'mascarilla-desechable',
        type: product.type || '',
        protection: product.protection || '',
        applications: product.applications || '',
        features: product.features || '',
        videoUrl: product.videoUrl || '',
        pdfUrl: product.pdfUrl || '',
        certification: product.certification || [],
        image: product.image || 'assets/images/products/default.jpg'
    };

    products.push(newProduct);
    saveProductsDatabase(products);

    return newProduct;
}

// Función para actualizar un producto
function updateProduct(productId, updatedData) {
    const products = getProductsDatabase();
    const index = products.findIndex(p => p.id === productId);

    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        saveProductsDatabase(products);
        return products[index];
    }

    return null;
}

// Función para eliminar un producto
function deleteProduct(productId) {
    const products = getProductsDatabase();
    const filteredProducts = products.filter(p => p.id !== productId);

    if (filteredProducts.length < products.length) {
        saveProductsDatabase(filteredProducts);
        return true;
    }

    return false;
}

// Función para obtener un producto por ID
function getProductById(productId) {
    const products = getProductsDatabase();
    return products.find(p => p.id === productId);
}

// Función para resetear a productos predeterminados
function resetToDefaultProducts() {
    saveProductsDatabase(defaultProducts);
}

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getProductsDatabase,
        saveProductsDatabase,
        productCategories,
        getProductsByCategory,
        searchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        resetToDefaultProducts
    };
}