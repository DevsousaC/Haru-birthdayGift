// CONFIGURAÇÕES DE DATAS

// DATA 1: Aniversário (Libera o site) -> 14/02/2026
const birthdayDate = new Date(2026, 1, 14, 3, 30, 0).getTime();

// DATA 2: A Partida para Maringá -> 28/02/2026
const departureDate = new Date(2026, 1, 28, 0, 0, 0).getTime();

// DATA 3: O Reencontro (Férias/Feriado) -> // Atualizar a data correta depois
const reunionDate = new Date(2026, 6, 1, 0, 0, 0).getTime(); 

// Elementos do DOM
const lockScreen = document.getElementById('lock-screen');
const mainContent = document.getElementById('main-content');
const countdownElement = document.getElementById('countdown');
const phaseBirthday = document.getElementById('phase-birthday');
const phaseDistance = document.getElementById('phase-distance');
const reunionTimerElement = document.getElementById('reunion-timer');
const btnAction = document.getElementById('btn-action');
const modal = document.getElementById('modal-renewal');
const closeBtn = document.getElementById('close-modal');
const lockMessage = document.getElementById('lock-message');
const timerMessage = document.getElementById('lock-screen_timer-message');
const quoteMessage = document.getElementById('quote-message');

var click = false;

function updateSystem() {
    const now = new Date().getTime(); // - Timer pré aniversario
    // const now = new Date(2026, 1, 14, 4, 36, 0).getTime(); // - Aniversario
    // const now = new Date(2026, 2, 3).getTime(); // Pós partida

    

    // Antes do dia 14/02
    if (now < birthdayDate) {
        const distance = birthdayDate - now;
        updateTimerDisplay(countdownElement, distance);
        return; 
    }

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden'); // Devolve a classe que esconde
        lockContent();
        click = true
    });


    btnAction.addEventListener('click', () => {
        modal.classList.remove('hidden'); // Remove a classe que esconde
        
        // Efeito extra: Disparar confetes ou bolhas extras aqui seria incrível
        // Mas por enquanto, apenas abrir já é o suficiente.
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            lockContent();
            click = true
        }
    });

    // é dia 14 ou depois. Libera o conteúdo!
    unlockContent();

    // Depois do dia 28/02
    if (now >= departureDate && click == false) {
        // Mostra a seção de distância
        phaseDistance.classList.remove('hidden');

        phaseBirthday.style.display = 'none';

        // Atualiza o contador da saudade (Reencontro)
        const distanceToReunion = reunionDate - now;
        
        if (distanceToReunion > 0) {
            updateTimerDisplay(reunionTimerElement, distanceToReunion);
        } else {
            reunionTimerElement.innerHTML = "O REENCONTRO É HOJE! ❤️";
        }
    } 
}

function unlockContent() {
    console.log(click)
    if(click == false) {
        lockScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
    }
}

function lockContent() {
    lockScreen.style.display = 'block';
    mainContent.classList.add('hidden');
    lockMessage.textContent = "Amostra biológica em processo de evolução.";
    timerMessage.textContent = "Evolução completa em:";
    quoteMessage.textContent = `"Você é meu lugar favorito no mundo"`;
}

// Função genérica para formatar qualquer timer
function updateTimerDisplay(element, distance) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.innerHTML = `
        ${days}d ${hours.toString().padStart(2, '0')}h 
        ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s
    `;
}

// --- LÓGICA DAS CÁPSULAS (MODAIS) ---

function openLetter(letterId) {
    const letter = document.getElementById(letterId);
    if (letter) {
        letter.classList.remove('hidden');
        letter.style.display = 'flex'; // Garante que use Flexbox para centralizar
    }
}

function closeLetter(letterId) {
    const letter = document.getElementById(letterId);
    if (letter) {
        letter.classList.add('hidden');
        letter.style.display = 'none'; // Esconde de novo
    }
}

// Fecha o modal se apertar ESC no teclado (UX Pro)
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        });
    }
});

// Atualização a cada segundo
setInterval(updateSystem, 1000);
updateSystem(); // Roda ao carregar