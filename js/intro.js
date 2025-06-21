class IntroManager {
    constructor() {
        this.elements = {
            introScreen: document.getElementById('introScreen'),
            logoContainer: document.getElementById('logoContainer'),
            enterBtn: document.getElementById('enterBtn'),
            bgMusic: document.getElementById('bgMusic'),
            mainContent: document.getElementById('mainContent')
        };
        
        this.isIntroActive = true;
        this.hasStarted = false;
        
        this.init();
    }

    init() {
        this.elements.enterBtn.addEventListener('click', () => this.startIntro());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.isIntroActive && !this.hasStarted) {
                this.startIntro();
            }
        });
    }

    async startIntro() {
        if (this.hasStarted) return;
        this.hasStarted = true;

        // tocar a música
        try {
            await this.elements.bgMusic.play();
        } catch (error) {
            console.log('Áudio não pôde ser reproduzido automaticamente');
        }

        // Logo aparece dps de mais ou menos 12 segundos
        setTimeout(() => {
            this.elements.logoContainer.classList.add('show');
        }, 12500);

        // Termina a intro e mostra o conteúdo intermediário
        setTimeout(() => {
            this.showMainContent();
        }, 15500);
    }

    showMainContent() {
        if (!this.isIntroActive) return;
        
        // tira a tela
        this.elements.introScreen.classList.add('fade-out');
        
        setTimeout(() => {
            this.elements.introScreen.style.display = 'none';
            this.elements.mainContent.classList.add('visible');
            document.body.style.overflow = 'auto';
            
            // Dps 3 segundos vai para home.html
            setTimeout(() => {
                this.goToHome();
            }, 6500);
        }, 1200);
    }

    goToHome() {
        window.location.href = '../pg/home.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new IntroManager();
});