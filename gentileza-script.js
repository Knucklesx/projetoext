// --- FUNCIONALIDADES DA PÁGINA DA ILHA DA GENTILEZA ---

document.addEventListener('DOMContentLoaded', () => {

    // Lógica do Modo Administrador
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === 'true';
    if (isAdmin) {
        document.body.classList.add('admin-mode');
    }

    // --- LÓGICA DA CAIXA DE MENSAGEM PERSONALIZADA ---
    const customAlertOverlay = document.getElementById('custom-alert-overlay');
    const customAlertMessage = document.getElementById('custom-alert-message');
    const customAlertCloseBtn = document.getElementById('custom-alert-close-btn');

    function showCustomAlert(message) {
        if(!customAlertOverlay) return; // Segurança
        customAlertMessage.textContent = message;
        customAlertOverlay.classList.add('show');
    }

    function hideCustomAlert() {
        if(!customAlertOverlay) return; // Segurança
        customAlertOverlay.classList.remove('show');
    }

    if(customAlertCloseBtn) customAlertCloseBtn.addEventListener('click', hideCustomAlert);
    if(customAlertOverlay) {
        customAlertOverlay.addEventListener('click', (event) => {
            if (event.target === customAlertOverlay) {
                hideCustomAlert();
            }
        });
    }

    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Sistema de abas
    tabLinks.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId + '-content').classList.add('active');
            
            if(tabId === 'mural'){
                renderMural();
            }
        });
    });

    // Lições de Gentileza
    const newLessonBtn = document.getElementById('new-lesson-btn');
    const lessonDisplay = document.querySelector('.lesson-display');
    const licoesDeGentileza = [
        "Elogie um amigo hoje.", "Ajude alguém sem que peçam.", "Diga 'bom dia' com um grande sorriso.",
        "Compartilhe seus brinquedos ou seu lanche.", "Pergunte a um amigo se ele está bem.",
        "Agradeça a alguém que te ajudou.", "Faça um desenho para uma pessoa especial.",
        "Guarde um segredo que te contaram.", "Escute com atenção quando alguém falar com você."
    ];

    if (newLessonBtn) {
        newLessonBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * licoesDeGentileza.length);
            lessonDisplay.textContent = licoesDeGentileza[randomIndex];
        });
    }

    // Mural da Gentileza (AGORA USANDO A CAIXA PERSONALIZADA)
    const publishBtn = document.getElementById('publish-btn');
    const nameInput = document.getElementById('kindness-name');
    const messageInput = document.getElementById('kindness-message');
    const muralContainer = document.getElementById('kindness-mural');
    const MURAL_KEY = 'gentilezaMuralMessages';

    function renderMural() {
        if (!muralContainer) return;
        const messages = JSON.parse(localStorage.getItem(MURAL_KEY)) || [];
        muralContainer.innerHTML = '';
        if (messages.length === 0) {
            muralContainer.innerHTML = '<p>O mural está vazio. Seja o primeiro a deixar uma mensagem!</p>';
            return;
        }
        messages.forEach(msgObject => {
            const note = document.createElement('div');
            note.classList.add('mural-note');
            const colorClass = `note-color-${(Math.floor(Math.random() * 5) + 1)}`;
            note.classList.add(colorClass);
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-note-btn');
            deleteBtn.innerHTML = '&times;';
            deleteBtn.addEventListener('click', () => {
                const isConfirmed = confirm('Tem certeza que quer apagar esta mensagem?');
                if (isConfirmed) {
                    deleteMessageById(msgObject.id);
                }
            });
            note.appendChild(deleteBtn);
            const messageP = document.createElement('p');
            messageP.className = 'mural-message';
            messageP.textContent = `"${msgObject.message}"`;
            const authorStrong = document.createElement('strong');
            authorStrong.className = 'mural-author';
            authorStrong.textContent = `- ${msgObject.name}`;
            note.appendChild(messageP);
            note.appendChild(authorStrong);
            muralContainer.appendChild(note);
        });
    }
    
    function deleteMessageById(messageId) {
        let messages = JSON.parse(localStorage.getItem(MURAL_KEY)) || [];
        messages = messages.filter(msg => msg.id !== messageId);
        localStorage.setItem(MURAL_KEY, JSON.stringify(messages));
        renderMural();
    }

    if (publishBtn) {
        publishBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            const message = messageInput.value.trim();
            
            if (name === '' || message === '') {
                // SUBSTITUÍDO: alert() pela nossa nova função
                showCustomAlert('Por favor, preencha seu nome e a mensagem!');
                return;
            }

            const newMessageObject = { id: Date.now(), name: name, message: message };
            const messages = JSON.parse(localStorage.getItem(MURAL_KEY)) || [];
            messages.push(newMessageObject);
            localStorage.setItem(MURAL_KEY, JSON.stringify(messages));
            
            nameInput.value = '';
            messageInput.value = '';
            
            // SUBSTITUÍDO: alert() pela nossa nova função
            showCustomAlert('Sua mensagem gentil foi publicada no mural! ✨');

            document.querySelector('.tab-link[data-tab="mural"]').click();
        });
    }

    if(document.querySelector('.kindness-mural')){
        renderMural();
    }
});