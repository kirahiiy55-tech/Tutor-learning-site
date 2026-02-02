function getLang() {
    return localStorage.getItem('language') || 'ua';
}

function checkPractice() {
    const tasks = document.querySelectorAll('.practice-task');
    let correctCount = 0;
    let totalTasks = tasks.length;
    let answeredCount = 0;
    
    tasks.forEach(task => {
        task.style.backgroundColor = '';
        task.style.border = '';
    });
    
    tasks.forEach(task => {
        const selected = task.querySelector('input[type="radio"]:checked');
        
        if (!selected) {
            task.style.backgroundColor = 'rgba(255, 165, 0, 0.5)';
            return;
        }
        
        answeredCount++;
        
        if (selected.value === 'correct') {
            correctCount++;
            task.style.backgroundColor = 'rgba(74, 222, 128, 0.5)';
        } else {
            task.style.backgroundColor = 'rgba(239, 68, 68, 0.5)';
        }
    });
    
    if (answeredCount < totalTasks) {
        const completeMessage = translations[getLang()].practice.completeMessage
        .replace('{answeredCount}', answeredCount)
        .replace('{totalTasks}', totalTasks);
        
        alert(completeMessage);
        return;
    }
    
    const percentage = Math.round((correctCount / totalTasks) * 100);
    
    if (correctCount === totalTasks) {
        const successMessage = translations[getLang()].practice.success
        replace('{correctCount}', correctCount)
        replace('{totalTasks}', totalTasks);

        alert(successMessage);
        return;
    } else {
        const resultMessage = translations[getLang()].practice.practiceResult
        .replace('{correct}', correctCount)
        .replace('{total}', totalTasks)
        .replace('{percent}', percentage);
    
        alert(resultMessage);
        return;
    }
}

function resetPractice() {
    const tasks = document.querySelectorAll('.practice-task');
    
    tasks.forEach(task => {
        const radios = task.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => radio.checked = false);
        
        task.style.backgroundColor = '';
    });
}