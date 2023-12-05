const startButton = document.querySelector('.start-timer');  // ? MAKE SURE TO DIFFERENTIATE BETWEEM ID'S AND CLASSES WHEN ASSIGNING CONST VALUES IN JAVASCRIPT. 
const resetButton = document.querySelector('.reset-timer');  // ? MAKE SURE TO DIFFERENTIATE BETWEEM ID'S AND CLASSES WHEN ASSIGNING CONST VALUES IN JAVASCRIPT. 
const timeDisplay = document.querySelector('.time');

let isWorkMode = true; // When false, it's break mode

let timerInterval; // Variable to hold the timer interval

// Function to start the timer
startButton.addEventListener('click', startTimer);

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    timeDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
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

function resetTimer() {
    clearInterval(timerInterval);
    isWorkMode = true;
    displayTime(25 * 60);
}

resetButton.addEventListener('click', resetTimer);

let sessionsCount = 0;

const sessionDisplay = document.getElementById('sessions-count');

if (timeLeft <= 0 && isWorkMode) {
    sessionsCount++;
    sessionDisplay.textContent = `Pomodoro Sessions Completed: ${sessionsCount}`;
}


