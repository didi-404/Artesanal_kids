// pego o nome da página atual pra saber qual função executar
let pag = window.location.pathname.split('/').pop();
let id = "";

// função pra criar o carousel da home com os produtos em destaque
function home() {
    let carouselProd = document.getElementById("carousel-produtos")
    let dados = ""

    // defino quantos produtos vão aparecer por slide
    const produtosPorSlide = 3
    // calculo quantos slides vou precisar baseado no total de produtos
    const totalSlides = Math.ceil(catalogoFilmesSeries.length / produtosPorSlide)

    // loop pra criar cada slide do carousel
    for (let slide = 0; slide < totalSlides; slide++) {
        // primeiro slide tem que ter a classe active
        dados += `
        <div class="carousel-item ${slide === 0 ? 'active' : ''}">
            <div class="container">
                <div class="row justify-content-center g-4">`

        // dentro de cada slide, adiciono 3 produtos
        for (let i = 0; i < produtosPorSlide; i++) {
            // calculo qual produto vai aparecer nessa posição
            const produtoIndex = (slide * produtosPorSlide) + i
            // só adiciono se o produto existir no array
            if (catalogoFilmesSeries[produtoIndex]) {
                let produto = catalogoFilmesSeries[produtoIndex]
                dados += `
                <div class="col-12 col-md-4">
                    <div class="produto-card" style="padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                        <img src="${produto.imagem}" alt="${produto.titulo}" 
                             class="produto-img" 
                             style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                        <h6 class="font-geral mt-3">${produto.titulo}</h6>
                        <p class="color-ak-blue font-geral">R$ 59,99</p>
                        <div class="d-flex justify-content-between gap-2 mt-2">
                            <a class="btn btn-detalhes flex-fill font-geral btn-fem" href="../pg/produto.html?id=${produto.id}">
                                <i class="bi bi-eye-fill"></i> Ver Detalhes
                            </a>
                            <a class="btn btn-detalhes btn-fem" href="../pg/carrinho.html">
                                <i class="bi bi-cart-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>`
            }
        }

        // fechr as divs do slide
        dados += `
                </div>
            </div>
        </div>`
    }

    carouselProd.innerHTML = dados
}

// função pra mostrar os produtos femininos na página de produtos
function produtosf() {
    let produtos = document.getElementById("produtosf")
    let dados = ""

    for (let i = 0; i < 12; i++) {
        let produto = poemas[i]

        dados += `
        <div class="col">
            <div class="produto-card">
            <img src="${produto.imagem}" alt="${produto.titulo}" class="produto-img">
            <h6 class="font-geral">${produto.titulo}</h6>
            <p class="color-ak-blue font-geral">R$ 59,99</p>
            <div class="d-flex justify-content-between gap-2 mt-2">
                <a class="btn btn-detalhes flex-fill font-geral btn-fem" href="../pg/produto.html?id=${produto.id}&genero=f">
                                <i class="bi bi-eye-fill"></i> Ver Detalhes
                            </a>
                <a class="btn btn-detalhes btn-fem" href="../pg/carrinho.html">
                <i class="bi bi-cart-fill"></i>
                </a>
            </div>
            </div>
        </div>`
    }

    produtos.innerHTML = dados;
}

// função pra mostrar os produtos masculinos na página de produtos
function produtosm() {
    let produtos = document.getElementById("produtosm")
    let dados = ""

    for (let i = 0; i < 12; i++) {
        let produto = catalogoFilmesSeries[i]

        dados += `
        <div class="col">
            <div class="produto-card">
            <img src="${produto.imagem}" alt="${produto.titulo}" class="produto-img">
            <h6 class="font-geral">${produto.titulo}</h6>
            <p class="color-ak-blue font-geral">R$ 59,99</p>
            <div class="d-flex justify-content-between gap-2 mt-2">
                <a class="btn btn-detalhes flex-fill font-geral btn-mas" href="../pg/produto.html?id=${produto.id}&genero=m">
                                <i class="bi bi-eye-fill"></i> Ver Detalhes
                            </a>
                <a class="btn btn-detalhes btn-mas" href="../pg/carrinho.html">
                <i class="bi bi-cart-fill"></i>
                </a>
            </div>
            </div>
        </div>`
    }

    produtos.innerHTML = dados;
}

// funçao pra mostrar o produto que selecinou
function produto(id) {
    //console.log(id)

    // aqui pega o id que esta na url
    id = new URLSearchParams(window.location.search).get('id');

    // a dif dos outros é que aqui pega o id da url e manda pra cá
    let genero = new URLSearchParams(window.location.search).get('genero');
    //console.log(genero)
    let produto = ""
    let titulo = document.getElementById("titulo")
    let imagem = document.getElementById("imagem")
    let descricao = document.getElementById("descricao")
    let tituloDados = ""
    let imagemDados = ""
    let descricaoDados = ""
    if (genero == "f") {
        produto = poemas.find(produto => produto.id == id)
        descricaoDados += `
              <h5 class="color-ak-secundary">Descrição</h5>
          <p>${produto.texto}</p>
    `
    } else {
        produto = catalogoFilmesSeries.find(produto => produto.id == id)
        descricaoDados += `
              <h5 class="color-ak-secundary">Descrição</h5>
          <p>${produto.sinopse}</p>
    `
    }

    tituloDados += `
    <h1 class="fw-bold color-ak-primary mb-3">${produto.titulo}</h1>
    `
    imagemDados += `
            <img src="${produto.imagem}" alt="${produto.titulo}" class="img-fluid rounded shadow produto-img" style="width: 100%; height: 400px; object-fit: cover;">
    `


    titulo.innerHTML = tituloDados
    imagem.innerHTML = imagemDados
    descricao.innerHTML = descricaoDados
}



// função pra preencher a página sobre com textos e frases
function sobre() {
    let sobre = document.getElementById("sobre")
    let modalSobre = document.getElementById("modalSobre")
    let dados = ""
    let dadosModal = ""

    for (let i = 0; i < 2; i++) {
        let texto = noticias[i]
        let frase = frasesMotivacionais[i]
        // junto o resumo da notícia com uma frase motivacional
        dados += `<p>${texto.resumo}</p><p><em>${frase.frase}</em> - ${frase.autor}</p>`
        dadosModal += `<p>${texto.resumo}</p>`
    }

    for (let i = 0; i < 4; i++) {
        let texto = noticias[i]
        // mais noticia
        dadosModal += `<p>${texto.resumo}</p>`
    }

    sobre.innerHTML = dados
    modalSobre.innerHTML = dadosModal
}

// função pra criar a galeria de fotos
function galeria() {
    let galeria = document.getElementById("galeria")
    let dados = ""

    for (let i = 0; i < 12; i++) {
        let foto = listaFotos[i]
        dados += `<img src="${foto.imagem}" alt="${foto.nome}" class="img-fluid m-2" style="width: 200px;">`
    }
    galeria.innerHTML = dados
}

// função pra criar os posts do blog
function blog() {
    let blog = document.getElementById("blog")
    let dados = ""

    for (let i = 0; i < 4; i++) {
        let post = galeriaFotos[i]

        dados += `
        <div class="blog-card">
        <img src="${post.imagem}" alt="${post.nome}">
        <div class="blog-content">
          <div class="blog-date"><i class="bi bi-calendar-fill"></i>${post.data}</div>
          <div class="blog-title-post">${post.titulo}</div>
          <p class="blog-text">${post.descricao}</p>
          <a href="#" class="blog-link">Ler mais <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
        `
    }

    blog.innerHTML = dados
}

function carrinho() {
    let carrinho = document.getElementById("carrinho")
    let dados = ""

    for (let i = 0; i < 4; i++) {
        let produto = catalogoFilmesSeries[i]
        dados += `
        <div class="cart-item">
          <img src="${produto.imagem}" alt="Item 1">
          <div class="cart-item-info">
            <h6>${produto.titulo}</h6>
            <small>Tamanho: M</small>
            <div class="cart-item-price">R$ 60,90</div>
          </div>
          <div class="quantity-controls">
            <button><i class="bi bi-dash"></i></button>
            <span>1</span>
            <button><i class="bi bi-plus"></i></button>
          </div>
          <button class="remove-btn"><i class="bi bi-trash-fill"></i></button>
        </div>
        `
    }

    carrinho.innerHTML = dados
}

// verifico qual página está aberta e executo a funçao
if (pag === "sobre.html") {
    sobre()
} else if (pag === "blog.html") {
    blog()
} else if (pag === "produtos.html") {
    produtosf()
    produtosm()
} else if (pag === "galeria.html") {
    galeria()
} else if (pag === "home.html") {
    home()
} else if (pag === "carrinho.html") {
    carrinho()
} else if (pag == "produto.html") {
    produto(id)
} 