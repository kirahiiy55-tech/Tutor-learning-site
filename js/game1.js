function getLang() {
    return localStorage.getItem('language') || 'ua';
}

// game1
function checkSingleInput(correctAnswer) {
    const block = document.getElementById(correctAnswer);
    const input = block.nextElementSibling;
    const userAnswer = input.value.trim().toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.style.backgroundColor = 'rgb(74, 222, 128)'; 
            input.style.borderColor = 'rgb(74, 222, 128)';
            alert(translations[getLang()].messages.success);
        } else {
            input.style.backgroundColor = 'rgb(239, 68, 68)';
            input.style.borderColor = 'rgb(239, 68, 68)';
            alert(translations[getLang()].messages.error)
        }
    };

// game2
function checkLetter(groupName, correctAnswer) {
    const selected = document.querySelector(`input[name="${groupName}"]:checked`);
    
    if (!selected) {
        alert(translations[getLang()].messages.alert);
        return;
    }
    
    const gameBlock = selected.closest('.game-block');
    const word = gameBlock.querySelector('.word-game3');
    const letters = word.querySelectorAll('.letter');
    
    letters.forEach(letter => {
        if (letter.src.includes('word-bg-error.svg') || 
            letter.src.includes(`${correctAnswer}.svg`)) {
            letter.src = 'word-game/word-bg.svg';
        }
    });

    if (selected.value === correctAnswer) {
        alert(translations[getLang()].messages.success);

        const letters = word.querySelectorAll('.letter');
        letters.forEach(letter => {
            if (letter.src.includes('word-bg.svg')) {
                letter.src = `word-game/${correctAnswer}.svg`;
            }
        });
        
    } else {
        alert(translations[getLang()].messages.error);
        
        const letters = word.querySelectorAll('.letter');
        letters.forEach(letter => {
            if (letter.src.includes('word-bg.svg')) {
                letter.src = 'word-game/word-bg-error.svg';
            }
        });
    }
}

// game3
function checkTranslate (wordId) {
    const word = document.getElementById(wordId);
    const select = word.parentElement.querySelector('select');
    const userChoice = select.value;
    
    if (userChoice === wordId) {
        alert(translations[getLang()].messages.success);
        select.style.backgroundColor = 'rgb(74, 222, 128)';
    } else {
        alert(translations[getLang()].messages.error);
        select.style.backgroundColor = 'rgb(239, 68, 68)';
    }
}

