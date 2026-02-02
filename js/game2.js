function getLang() {
    return localStorage.getItem('language') || 'ua';
}

// game1
function checkSingleCard(cardId) {
    const card = document.getElementById(cardId);
    const select = card.querySelector('select');
    const userChoice = select.value;
    
    if (userChoice === cardId) {
        alert(translations[getLang()].messages.success);
        select.style.backgroundColor = 'rgb(74, 222, 128)';
    } else {
        alert(translations[getLang()].messages.error);
        select.style.backgroundColor = 'rgb(239, 68, 68)';
    }
}

// game2
let draggedElement = null;

function initMatchingGame() {
    const words = document.querySelectorAll('.word-item');
    words.forEach(word => {
        word.addEventListener('dragstart', (e) => {
            draggedElement = word;
            word.classList.add('dragging');
        });

        word.addEventListener('dragend', (e) => {
            word.classList.remove('dragging');
        });
    });

    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');

            if (draggedElement && !zone.classList.contains('filled')) {
                zone.textContent = draggedElement.dataset.word;
                zone.classList.add('filled');
                zone.dataset.droppedWord = draggedElement.dataset.word;
                draggedElement.classList.add('used');
            }
        });

        zone.addEventListener('click', () => {
            if (zone.classList.contains('filled')) {
                const word = zone.dataset.droppedWord;
                const wordElement = document.querySelector(`.word-item[data-word="${word}"]`);
                if (wordElement) {
                    wordElement.classList.remove('used');
                }
                zone.textContent = 'Перетягни сюди';
                zone.classList.remove('filled', 'correct', 'incorrect');
                delete zone.dataset.droppedWord;
            }
        });
    });
}

function checkMatching() {
    let correct = 0;
    let total = 0;

    document.querySelectorAll('.card-game2').forEach(item => {
        const correctAnswer = item.dataset.answer;
        const dropZone = item.querySelector('.drop-zone');
        const userAnswer = dropZone.dataset.droppedWord;

        if (userAnswer) {
            total++;
            if (userAnswer === correctAnswer) {
                dropZone.classList.add('correct');
                dropZone.classList.remove('incorrect');
                correct++;
            } else {
                dropZone.classList.add('incorrect');
                dropZone.classList.remove('correct');
            }
        }
    });

    if (total === 0) {
        alert(translations[getLang()].messages.matchword);
    } else if (correct === 6) {
        alert(translations[getLang()].messages.success);
    } else {
        alert(`Правильно: ${correct} ${translations[getLang()].messages.matchgame}`);
    }
}

document.addEventListener('DOMContentLoaded', initMatchingGame);

// game3
function checkCrossword() {
    const inputs = document.querySelectorAll('.crossword-grid input');
    let allCorrect = true;

    inputs.forEach(input => {
        const userAnswer = input.value.toUpperCase();
        const correctAnswer = input.dataset.answer;
        
        if (userAnswer === correctAnswer) {
            input.style.color = 'rgb(84, 151, 84)'
        } else {
            input.style.color = 'rgb(239, 68, 68)'
            allCorrect = false;
        }
    });
    
    if (allCorrect) {
        alert(translations[getLang()].messages.success);
    } else {
        alert(translations[getLang()].messages.error);
    }
}

document.querySelectorAll('.crossword-grid input').forEach((input, index, inputs) => {
    input.addEventListener('input', (e) => {
        if (e.target.value && index < inputs.length - 1) {
            let nextIndex = index + 1;
            while (nextIndex < inputs.length) {
                if (inputs[nextIndex].tagName === 'INPUT') {
                    inputs[nextIndex].focus();
                    break;
                }
                nextIndex++;
            }
        }
    });
});