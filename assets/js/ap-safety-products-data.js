// Base de datos de productos AP Safety
const apSafetyProducts = [
    {
        id: 'z5',
        name: 'Z5',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable',
        protection: 'Partículas no Tóxicas',
        applications: 'ALMIDÓN, ALUMINA, ALFALFA, BAUXITA, BENTONITA, CARBONATO DE CALCIO, CAOLÍN, CAUCHO, DIÓXIDO DE TITANIO, ESMERIL, ESTRATO DE ZINC, GRAFITO, MAGNESIA, MÁRMOL, POLVO DE VIDRIO, SAL, SILICIO, SACAROSA, YESO',
        features: [
            'Confiable para partículas no tóxicas con exposición por debajo de 15mg/m³',
            'Fácil respiración y comunicación',
            'Diseño que permite visión clara y uso con lentes de seguridad',
            'Ajuste perfecto al contorno facial',
            'Banda elástica indeformable',
            'Económica y desechable (duración: 1 turno de trabajo)',
            'Empaque: 50 mascarillas'
        ],
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
        applications: 'Polvos molestos y partículas libres de aceite como madera, vidrio, harina, yeso, esmeril, fibras textiles, desperdicios, papel, cartón, granos. Industrias alimenticia, hospitalaria y electrónica',
        features: [
            'Respirador purificador con clip nasal y doble liga',
            'Totalmente anatómico con ajuste perfecto',
            'Filtra partículas mayores a 10 micras',
            'Para polvos libres de aceite',
            'Tamaño mediano adaptable a cualquier cara'
        ],
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
        applications: 'Corte, pulido, lijado, molienda y barrido. Polvos minerales de hierro, aluminio, acero, harina, madera, cemento, fibras textiles, carbón, sílice',
        features: [
            'Medio filtrante electroestático de alta tecnología',
            'Eficiencia mínima del 95%',
            'No obstaculiza la respiración',
            'Respirador desechable libre de mantenimiento',
            'Elásticos resistentes a altas temperaturas',
            'Compatible con otros equipos de seguridad',
            'Totalmente acojinado por la parte interna',
            'No usar contra partículas con límite menor a 0.05 mg/m³'
        ],
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
        applications: 'Fundición, corte, molienda. Protección contra humos, neblinas y polvos libres de aceite',
        features: [
            'Medio filtrante electroestático resistente al taponamiento',
            'Eficiencia mínima del 99%',
            'Respirador desechable libre de mantenimiento',
            'Elásticos extra resistentes',
            'Anatómico y cómodo',
            'Excelente retención de partículas',
            'Compatible con otros EPP',
            'Totalmente hipoalergénico',
            'No usar con límite menor a 0.05 mg/m³ o oxígeno menor a 19.5%'
        ],
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
        applications: 'Corte, pulido, lijado, molienda y barrido. Polvos minerales de hierro, aluminio, acero, harina, madera, cemento, fibras textiles, carbón, sílice',
        features: [
            'Medio filtrante electroestático de alta tecnología',
            'Eficiencia mínima del 95%',
            'Respirador desechable libre de mantenimiento',
            'Clip nasal plástico para sello confortable',
            'Gran resistencia a la deformación por humedad',
            'Compatible con otros equipos de seguridad',
            'Excelente relación costo-eficiencia',
            'Este respirador no suministra oxígeno'
        ],
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/M10_M10V.pdf',
        certification: ['N95', 'NOM-116-STPS-1994 Tipo P-1'],
        image: 'assets/images/products/m10.jpg'
    },
    {
        id: 'm10v',
        name: 'M10V',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable',
        protection: 'N95',
        applications: 'Corte, pulido, lijado, molienda y barrido. Polvos minerales de hierro, aluminio, acero, harina, madera, cemento, fibras textiles, carbón, sílice',
        features: [
            'Medio filtrante electroestático de alta tecnología',
            'Eficiencia mínima del 95%',
            'Con válvula de exhalación para mayor frescura',
            'Respirador desechable libre de mantenimiento',
            'Clip nasal plástico para sello confortable',
            'Gran resistencia a la deformación por humedad',
            'Compatible con otros equipos de seguridad',
            'Excelente relación costo-eficiencia'
        ],
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
        protection: 'N95',
        applications: 'Humos, neblinas y partículas libres de aceite. Procesos de fundición, corte con soplete, soldadura eléctrica y autógena. Industria petroquímica, agricultura, aplicación de asfaltos. Protección contra humos metálicos y vapores orgánicos',
        features: [
            'Combinación de filtro electroestático y carbón activado',
            'Eficiencia mínima del 95%',
            'Diseñado especialmente para niños',
            'Retiene partículas y neblinas sólidas libres de aceite',
            'Filtro de carbón activado para humos y vapores',
            'Aplicaciones con pintura, barniz y agroquímicos'
        ],
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
        applications: 'Humos, neblinas y partículas con aceite. Procesos de fundición, soldadura, procesos industriales con neblinas de aceite, aplicación de agroquímicos, plaguicidas',
        features: [
            'Medio filtrante electroestático de alta tecnología',
            'Eficiencia mínima del 95%',
            'A prueba de aceite',
            'Filtro resistente al taponamiento',
            'Respirador desechable libre de mantenimiento',
            'Elásticos resistentes a altas temperaturas',
            'Clip nasal plástico para ajuste confortable',
            'Compatible con otros equipos de seguridad'
        ],
        videoUrl: '',
        pdfUrl: 'http://l6000297.ferozo.com/pdf/M11_M11V.pdf',
        certification: ['P95', 'NOM-116-STPS-2009', 'NMX-S-054-SCFI-2013'],
        image: 'assets/images/products/m11.jpg'
    },
    {
        id: 'm11v',
        name: 'M11V',
        category: 'mascarilla-desechable',
        type: 'Mascarilla desechable',
        protection: 'P95',
        applications: 'Humos, neblinas y partículas con aceite. Procesos de fundición, soldadura, procesos industriales con neblinas de aceite, aplicación de agroquímicos, plaguicidas',
        features: [
            'Medio filtrante electroestático de alta tecnología',
            'Eficiencia mínima del 95%',
            'A prueba de aceite',
            'Con válvula de exhalación para mayor frescura',
            'Filtro resistente al taponamiento',
            'Respirador desechable libre de mantenimiento',
            'Elásticos resistentes a altas temperaturas',
            'Compatible con otros equipos de seguridad'
        ],
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
        features: [
            'Combinación de filtro N95 y carbón activado',
            'Eficiencia mínima del 95% para partículas',
            'Protección contra vapores orgánicos',
            'Respirador desechable libre de mantenimiento',
            'Ideal para aplicaciones con pintura y barniz',
            'Compatible con otros equipos de seguridad',
            'Excelente para manejo de agroquímicos'
        ],
        videoUrl: '',
        pdfUrl: '',
        certification: ['N95'],
        image: 'assets/images/products/m14.jpg'
    }
];

// Categorías disponibles
const productCategories = [
    { id: 'all', name: 'Todos los productos', icon: 'fa-th' },
    { id: 'mascarilla-desechable', name: 'Mascarillas Desechables', icon: 'fa-head-side-mask' },
    { id: 'respirador-infantil', name: 'Respiradores Infantiles', icon: 'fa-child' },
    { id: 'n95', name: 'N95', icon: 'fa-shield-virus' },
    { id: 'n99', name: 'N99', icon: 'fa-shield-alt' },
    { id: 'p95', name: 'P95', icon: 'fa-shield-virus' },
    { id: 'valvula', name: 'Con Válvula', icon: 'fa-wind' },
    { id: 'carbon-activado', name: 'Carbón Activado', icon: 'fa-filter' }
];

// Función para obtener productos por categoría
function getProductsByCategory(category) {
    if (category === 'all') {
        return apSafetyProducts;
    }

    return apSafetyProducts.filter(product => {
        // Verificar categoría principal
        if (product.category === category) return true;

        // Verificar certificaciones
        if (category === 'n95' && product.certification.includes('N95')) return true;
        if (category === 'n99' && product.certification.includes('N99')) return true;
        if (category === 'p95' && product.certification.includes('P95')) return true;

        // Verificar si tiene válvula
        if (category === 'valvula' && product.name.toLowerCase().includes('v')) return true;

        // Verificar carbón activado
        if (category === 'carbon-activado' &&
            (product.protection.toLowerCase().includes('carbón') ||
             product.features.some(f => f.toLowerCase().includes('carbón')))) return true;

        return false;
    });
}

// Función para buscar productos
function searchProducts(searchTerm) {
    const term = searchTerm.toLowerCase();
    return apSafetyProducts.filter(product => {
        return product.name.toLowerCase().includes(term) ||
               product.protection.toLowerCase().includes(term) ||
               product.applications.toLowerCase().includes(term) ||
               product.features.some(f => f.toLowerCase().includes(term));
    });
}

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { apSafetyProducts, productCategories, getProductsByCategory, searchProducts };
}