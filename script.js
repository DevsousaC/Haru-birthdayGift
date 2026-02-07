// CONFIGURAÇÕES DE DATAS

// DATA 1: Aniversário (Libera o site) -> 14/02/2026
const birthdayDate = new Date(2026, 1, 14, 0, 0, 0).getTime();

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

function updateSystem() {
    const now = new Date().getTime(); // - Timer pré aniversario
    // const now = new Date(2026, 1, 14).getTime(); // - Aniversario
    // const now = new Date(2026, 2, 3).getTime(); // Pós partida

    // Antes do dia 14/02
    if (now < birthdayDate) {
        const distance = birthdayDate - now;
        updateTimerDisplay(countdownElement, distance);
        return; 
    }

    // é dia 14 ou depois. Libera o conteúdo!
    // unlockContent();

    // Depois do dia 28/02
    if (now >= departureDate) {
        // Mostra a seção de distância
        // phaseDistance.classList.remove('hidden');

        // phaseBirthday.style.display = 'none';

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
    lockScreen.style.display = 'none';
    mainContent.classList.remove('hidden');
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

// Atualização a cada segundo
setInterval(updateSystem, 1000);
updateSystem(); // Roda ao carregar