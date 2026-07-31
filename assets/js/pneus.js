let dadosProdutosAgricola = [];
let dadosProdutosIndustrial = [];
let dadosProdutosOtr = [];

async function buscarDados(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro ao carregar ${url}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

function page_path() {
    const page = window.location.pathname.split('/').pop().split('.').shift();
    return  page
}

function carregarProdutos() {
    const container = document.getElementById('catalogo-container');
    if (!container) return;

    const page = page_path();

    if(page == '' || page == 'index') {
        return;
    }

    const basePath = '../assets/';
    
    let dadosParaExibir = [];

    if (page === 'otr') {
        dadosParaExibir = dadosProdutosOtr;
    } else if (page === 'agricola') {
        dadosParaExibir = dadosProdutosAgricola;
    } else if (page === 'industrial') {
        dadosParaExibir = dadosProdutosIndustrial;
    }

    container.innerHTML = '';

    if (!dadosParaExibir || dadosParaExibir.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhum produto encontrado para esta categoria.</p>';
        return;
    }

    dadosParaExibir.forEach(produto => {
        const linhasTabela = produto.tabela.map(item => `
            <tr>
                <td class="fw-bold text-nowrap">${item.medida}</td>
                <td>${item.lonas}</td>
                <td>${item.peso}</td>
                <td><span class="badge bg-light text-dark border">${item.vel}</span></td>
                <td>${item.carga}</td>
                <td>${item.pressao}</td>
                <td>${item.largura}</td>
                <td>${item.diam}</td>
                <td>${item.sulco ? item.sulco : ''}</td>
            </tr>
        `).join('');

        const cardHTML = `
    <div class="col-12 mb-4"> 
        <div class="card border-0 shadow-lg rounded-4 overflow-hidden h-100">
            <div class="row g-0 h-100">
                
                <div class="col-lg-5 bg-light d-flex align-items-center justify-content-center p-0">
                    <img src="${basePath}${produto.imagem}" class="img-fluid" style="width: 50%; object-fit: contain;" alt="${produto.titulo}" />
                </div>

                <div class="col-lg-7 p-4">
                    <div class="card-body p-3 h-100 d-flex flex-column">
                        
                        <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 border-bottom pb-3">
                            <div class="mb-2 mb-md-0">
                                <h3 class="fw-bold m-0 text-brand-red lh-1">${produto.titulo}</h3>
                                <small class="text-muted fw-bold text-uppercase" style="font-size: 0.75rem; letter-spacing: 1px;" data-i18n="name_serie_otr">
                                    ${produto.subtitulo}
                                </small>
                            </div>

                            <div class="d-flex gap-2 align-items-center flex-wrap justify-content-end">
                                <span class="badge rounded-pill bg-dark d-flex align-items-center px-3 py-2 shadow-sm">
                                    <i class="bi bi-upc-scan me-2"></i>
                                    <span data-i18n="name_modelo">Modelo</span>: ${produto.specs.modelo}
                                </span>
                                
                                ${produto.specs.sulco ? `
                                <span class="badge rounded-pill bg-secondary d-flex align-items-center px-3 py-2 shadow-sm">
                                    <i class="bi bi-rulers me-2"></i> 
                                    <span data-i18n="name_sulco">Sulco</span>: ${produto.specs.sulco}
                                </span>
                                ` : ''}

                                <span class="badge rounded-pill bg-secondary d-flex align-items-center px-3 py-2 shadow-sm">
                                    <i class="bi bi-layers-half me-2"></i> 
                                    <span data-i18n="name_tipo">Tipo</span>: ${produto.specs.tipo}
                                </span>
                            </div>
                        </div>

                        <div class="table-responsive flex-grow-1">
                            <table class="table table-striped table-hover text-center align-middle mb-0">
                                <thead class="table-header-red">
                                    <tr>
                                        <th data-i18n="name_medida">MEDIDA</th>
                                        <th data-i18n="name_lonas">LONAS</th>
                                        <th data-i18n="name_peso">PESO</th>
                                        <th data-i18n="name_vel">VEL.</th>
                                        <th data-i18n="name_carga_maxima">CARGA MÁXIMA</th>
                                        <th data-i18n="name_pressao_maxima">PRESSÃO MÁXIMA</th>
                                        <th data-i18n="name_largura">MEDIDA DA SESSÃO</th>
                                        <th data-i18n="name_diametro">DIÂM.</th>
                                        ${produto.tabela[0].sulco ? '<th data-i18n="name_sulco">SULCO</th>' : ''}
                                    </tr>
                                </thead>
                                <tbody>
                                    ${linhasTabela}
                                </tbody>
                            </table>
                        </div>

                        <div class="mt-3 d-flex justify-content-end gap-2">
                            <a href="${basePath}${produto.pdfLink}" class="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold" target="_blank" data-i18n="button_pdf_tecnico">
                            <i class="bi bi-file-earmark-pdf-fill me-1"></i> PDF Técnico
                            </a>
                            <a href="${basePath}${produto.info}" class="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold" target="_blank" data-i18n="button_info_tecnico">
                            <i class="bi bi-file-earmark-pdf-fill me-1"></i> Info Técnico
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}


async function inicializarCatalogo() {

    const page = page_path();

    if(page == '' || page == 'index') {
        return;
    }

    const [agricola, industrial, otr] = await Promise.all([
        buscarDados('../assets/js/agricola.json'),
        buscarDados('../assets/js/industrial.json'),
        buscarDados('../assets/js/otr.json')
    ]);

    dadosProdutosAgricola = agricola || [];
    dadosProdutosIndustrial = industrial || [];
    dadosProdutosOtr = otr || [];

    carregarProdutos();
    const idiomaSalvo = localStorage.getItem('idioma_preferido') || 'pt';
    mudarIdioma(idiomaSalvo);
}

document.addEventListener('DOMContentLoaded', inicializarCatalogo);