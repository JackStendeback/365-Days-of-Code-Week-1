const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-timer');   
const pauseButton = document.getElementById('reset-timer');

let isWorkMode = true; // When false, it's break mode

let timerInterval; // Variable to hold the timer interval

// Function to start the timer
startButton.addEventListener('click', startTimer);

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function startTimer() {
    clearInterval(timerInterval);

    let timeLeft = isWorkMode ? 25 * 60 : 5 * 60; // Calculate the time based on the mode

    timerInterval = setInterval(() => {
        timeLeft--;
        displayTime(timeLeft);

    if (timeLeft <= 0) {
        isWorkMode = !isWorkMode;
        startTimer();
    } 
 }, 1000);
}


