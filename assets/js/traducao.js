const traducoes = {
    'pt': {
        'nav_home': 'Home',
        'nav_catalogos': 'Catálogos',
        'nav_idioma': 'Idioma',
        'btn_pdf': 'Baixar PDF',
        'hero_slogan': 'Confiança e qualidade',
        'card_agricola_titulo': 'Linha Agrícola',
        'card_agricola_desc': 'O pneu O1351 é o coração da nossa linha de tração. Projetado para tratores de alta potência.',
        'card_industrial_titulo': 'Agro-Industrial',
        'card_industrial_desc': 'Versatilidade total para serviços mistos. Projetado especificamente para implementos.',
        'card_otr_titulo': 'Linha OTR',
        'card_otr_desc': 'Robustez extrema para mineração e obras. Pneus com carcaças reforçadas.',
        'btn_acessar': 'Acesse pelo menu Catálogos',
        'footer_copyright': '© 2025 Tyres Pneus. Todos os direitos reservados.',
        'name_serie_otr': 'Série OTR',
        'name_modelo': 'Modelo',
        'name_sulco': 'Sulco',
        'name_tipo': 'Tipo',
        'name_medida': 'Medida',
        'name_lonas': 'Lonas',
        'name_peso': 'Peso',
        'name_vel': 'Vel',
        'name_carga_maxima': 'Carga Máxima',
        'name_pressao_maxima': 'Pressão Máxima',
        'name_largura': 'Largura',
        'name_diametro': 'Diâm.',
        'button_pdf_tecnico': 'PDF técnico',
        'button_info_tecnico': 'Info técnico'
    },
    'en': {
        'nav_home': 'Home',
        'nav_catalogos': 'Catalogs',
        'nav_idioma': 'Language',
        'btn_pdf': 'Download PDF',
        'hero_slogan': 'Trust and Quality',
        'card_agricola_titulo': 'Agricultural Line',
        'card_agricola_desc': 'The O1351 tire is the heart of our traction line. Designed for high-power tractors.',
        'card_industrial_titulo': 'Agro-Industrial',
        'card_industrial_desc': 'Total versatility for mixed services. Designed specifically for implements.',
        'card_otr_titulo': 'OTR Line',
        'card_otr_desc': 'Extreme robustness for mining and construction. Tires with reinforced casings.',
        'btn_acessar': 'Access via Catalogs menu',
        'footer_copyright': '© 2025 Tyres Pneus. All rights reserved.',
        'name_serie_otr': 'OTR Series',
        'name_modelo': 'Model',
        'name_sulco': 'Tread',
        'name_tipo': 'Type',
        'name_medida': 'Size',
        'name_lonas': 'Ply',
        'name_peso': 'Weight',
        'name_vel': 'Speed',
        'name_carga_maxima': 'Max Load',
        'name_pressao_maxima': 'Max Pressure',
        'name_largura': 'Width',
        'name_diametro': 'Diam.',
        'button_pdf_tecnico': 'Technical PDF',
        'button_info_tecnico': 'Technical Info'
    },
    'es': {
        'nav_home': 'Inicio',
        'nav_catalogos': 'Catálogos',
        'nav_idioma': 'Idioma',
        'btn_pdf': 'Descargar PDF',
        'hero_slogan': 'Confianza y Calidad',
        'card_agricola_titulo': 'Línea Agrícola',
        'card_agricola_desc': 'El neumático O1351 es el corazón de nuestra línea de tracción. Diseñado para tractores de alta potencia.',
        'card_industrial_titulo': 'Agro-Industrial',
        'card_industrial_desc': 'Versatilidad total para servicios mixtos. Diseñado específicamente para implementos.',
        'card_otr_titulo': 'Línea OTR',
        'card_otr_desc': 'Robustez extrema para minería y obras. Neumáticos con carcasas reforzadas.',
        'btn_acessar': 'Acceder por el menú Catálogos',
        'footer_copyright': '© 2025 Tyres Pneus. Todos los derechos reservados.',
        'name_serie_otr': 'Serie OTR',
        'name_modelo': 'Modelo',
        'name_sulco': 'Surco',
        'name_tipo': 'Tipo',
        'name_medida': 'Medida',
        'name_lonas': 'Capas',
        'name_peso': 'Peso',
        'name_vel': 'Vel',
        'name_carga_maxima': 'Carga Máxima',
        'name_pressao_maxima': 'Presión Máxima',
        'name_largura': 'Ancho',
        'name_diametro': 'Diám.',
        'button_pdf_tecnico': 'PDF técnico',
        'button_info_tecnico': 'Info técnico'
    }
};

function mudarIdioma(idioma) {
    const elementosParaTraduzir = document.querySelectorAll('[data-i18n]');
    
    elementosParaTraduzir.forEach(elemento => {
        const chave = elemento.getAttribute('data-i18n');
        if (traducoes[idioma] && traducoes[idioma][chave]) {
            elemento.innerText = traducoes[idioma][chave];
        }
    });

    localStorage.setItem('idioma_preferido', idioma);

}

function esconder_home(page){
    const homeLink = document.querySelector('a[data-i18n="nav_home"]');
    if (!homeLink) return;
    if(page === 'index' || page === ''){
        homeLink.style.display = 'none';
    } else {
        homeLink.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    esconder_home(window.location.pathname.split('/').pop().split('.').shift());
    const idiomaSalvo = localStorage.getItem('idioma_preferido') || 'pt';
    mudarIdioma(idiomaSalvo);
});

