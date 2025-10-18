// --- FUNCIONALIDADES DA PÁGINA DA ILHA DA MENTE ---

document.addEventListener('DOMContentLoaded', () => {

    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const magicWordBtn = document.getElementById('magic-word-btn');
    const magicWordDisplay = document.querySelector('.magic-word-display');
    const breathingText = document.querySelector('.breathing-text');
    const breathingCircle = document.querySelector('.breathing-circle');

    // --- LÓGICA DA CAIXA DE MENSAGEM PERSONALIZADA ---
    const customAlertOverlay = document.getElementById('custom-alert-overlay');
    const customAlertMessage = document.getElementById('custom-alert-message');
    const customAlertCloseBtn = document.getElementById('custom-alert-close-btn');

    // Função para MOSTRAR a caixa de mensagem
    function showCustomAlert(message) {
        customAlertMessage.textContent = message;
        customAlertOverlay.classList.add('show');
    }

    // Função para FECHAR a caixa de mensagem
    function hideCustomAlert() {
        customAlertOverlay.classList.remove('show');
    }

    // Eventos para fechar a caixa
    if(customAlertCloseBtn) customAlertCloseBtn.addEventListener('click', hideCustomAlert);
    if(customAlertOverlay) {
        customAlertOverlay.addEventListener('click', (event) => {
            if (event.target === customAlertOverlay) {
                hideCustomAlert();
            }
        });
    }

    // --- LÓGICA DO DIÁRIO (AGORA USANDO A CAIXA PERSONALIZADA) ---
    const diarioTextarea = document.querySelector('#diario-content textarea');
    const diarioBtn = document.querySelector('#diario-content .action-btn');

    const mensagensAcolhedoras = [
        "Obrigado por compartilhar seus sentimentos! Eles estão guardados em um lugar seguro. ✨",
        "Que bom que você confia em mim! Lembre-se sempre: você é incrível do jeitinho que é. ❤️",
        "Suas palavras são importantes! Guardei tudo com muito carinho no coração. 🤗",
        "Entendido! Saiba que você é muito especial e seus sentimentos são valiosos. 💖",
        "Recebido! Guardar seus pensamentos é uma honra para mim. Continue brilhando! 🌟"
    ];

    if (diarioBtn) {
        diarioBtn.addEventListener('click', () => {
            if (diarioTextarea.value.trim() !== '') {
                const randomIndex = Math.floor(Math.random() * mensagensAcolhedoras.length);
                // SUBSTITUÍDO: alert() pela nossa nova função
                showCustomAlert(mensagensAcolhedoras[randomIndex]);
                diarioTextarea.value = '';
            } else {
                // SUBSTITUÍDO: alert() pela nossa nova função
                showCustomAlert('Você pode escrever qualquer coisinha que estiver sentindo! Estou aqui para ouvir.');
            }
        });
    }
    
    // --- LÓGICAS ANTIGAS (sem alterações) ---
    tabLinks.forEach(tab => {
        tab.addEventListener('click', () => {
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId + '-content').classList.add('active');
        });
    });

    const palavrasMagicas = [
        "Eu sou forte e corajoso(a).", "Meus sentimentos são importantes.", "É normal cometer erros, eles me ajudam a aprender.",
        "Eu sou amado(a) e especial.", "Eu consigo superar qualquer desafio!", "Respirar fundo me ajuda a ficar calmo(a).",
        "Eu sou criativo(a) e cheio(a) de ideias.", "A gentileza é um superpoder.", "Hoje é um bom dia para ser feliz."
    ];

    if (magicWordBtn) {
        magicWordBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * palavrasMagicas.length);
            magicWordDisplay.textContent = palavrasMagicas[randomIndex];
        });
    }

    if (breathingCircle) {
        breathingCircle.addEventListener('animationiteration', () => {
            setTimeout(() => { breathingText.textContent = 'Expire...'; }, 4000);
            breathingText.textContent = 'Inspire...';
        });
    }
});