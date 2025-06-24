// classe pra gerenciar toda a intro do site
class AnimacaoIntro {
    constructor() {
        // pego todos os elementos que vou usar na intro
        this.elementos = {
            telaIntro: document.getElementById('introScreen'),
            containerLogo: document.getElementById('logoContainer'),
            btnEntrar: document.getElementById('enterBtn'),
            musicaFundo: document.getElementById('bgMusic'),
            conteudoPrincipal: document.getElementById('mainContent')
        };
        
        // variáveis pra controlar o estado da intro
        this.introAtiva = true;
        this.jaComecou = false;
        
        // inicializo tudo
        this.configurarEventos();
    }

    // função pra configurar os eventos
    configurarEventos() {
        // quando clica no botão enter, começa a intro
        this.elementos.btnEntrar.addEventListener('click', () => this.iniciarIntro());
        
        // também pode apertar Enter no teclado pra começar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.introAtiva && !this.jaComecou) {
                this.iniciarIntro();
            }
        });
    }

    // função que inicia toda a sequência da intro
    async iniciarIntro() {
        // se já começou, não faz nada
        if (this.jaComecou) return;
        this.jaComecou = true;

        // tento tocar a música de fundo
        try {
            await this.elementos.musicaFundo.play();
        } catch (error) {
            console.log('Áudio não pôde ser reproduzido automaticamente');
        }

        // depois de 12.5 segundos, mostro o logo
        setTimeout(() => {
            this.elementos.containerLogo.classList.add('show');
        }, 12500);

        // depois de 15.5 segundos, termino a intro
        setTimeout(() => {
            this.mostrarConteudo();
        }, 15500);
    }

    // função que mostra o conteúdo principal e tira a intro
    mostrarConteudo() {
        // se a intro não tá ativa, não faz nada
        if (!this.introAtiva) return;
        
        // adiciono a classe pra fazer o fade out da tela da intro
        this.elementos.telaIntro.classList.add('fade-out');
        
        // depois de 1.2 segundos
        setTimeout(() => {
            // escondo a tela da intro completamente
            this.elementos.telaIntro.style.display = 'none';
            // mostro o conteúdo principal
            this.elementos.conteudoPrincipal.classList.add('visible');
            // libero o scroll da página
            document.body.style.overflow = 'auto';
            
            // depois de mais 6.5 segundos, vou pra home
            setTimeout(() => {
                this.irParaHome();
            }, 6500);
        }, 1200);
    }

    // função pra ir pra página home
    irParaHome() {
        window.location.href = 'pg/home.html';
    }
}

// quando a página carregar, crio uma nova instância da AnimacaoIntro
document.addEventListener('DOMContentLoaded', () => {
    new AnimacaoIntro();
});