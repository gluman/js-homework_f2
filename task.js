function loadPoll() {
    fetch('https://students.netoservices.ru/nestjs-backend/poll')
        .then(response => response.json())
        .then(data => {
            const pollTitle = document.getElementById('poll__title');
            const pollAnswers = document.getElementById('poll__answers');
            
            pollTitle.textContent = data.data.title;
            pollAnswers.innerHTML = data.data.answers.map((answer, index) => `
                <button class="poll__answer" data-index="${index}">
                    ${answer}
                </button>
            `).join('');
        });
}

loadPoll();

document.getElementById('poll__answers').addEventListener('click', (event) => {
    if (event.target.classList.contains('poll__answer')) {
        const index = event.target.dataset.index;
        alert('Спасибо, ваш голос засчитан!');

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const pollAnswers = document.getElementById('poll__answers');
                pollAnswers.innerHTML = response.stat.map(item => `
                    <div>${item.answer}: ${item.votes} голосов</div>
                `).join('');
            }
        };
        xhr.send(`vote=1&answer=${index}`);
    }
});