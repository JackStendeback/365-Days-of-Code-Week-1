const startButton = document.querySelector('.start-timer');  // ? MAKE SURE TO DIFFERENTIATE BETWEEM ID'S AND CLASSES WHEN ASSIGNING CONST VALUES IN JAVASCRIPT. 
const resetButton = document.querySelector('.reset-timer');  // ? MAKE SURE TO DIFFERENTIATE BETWEEM ID'S AND CLASSES WHEN ASSIGNING CONST VALUES IN JAVASCRIPT. 
const timeDisplay = document.querySelector('.time');
const sessionDisplay = document.getElementById('sessions-count');
const startSound = new Audio('audio/pomodoro-start.mp3'); // * Start Audio
const endSound = new Audio('audio/pomodoro-end.mp3'); // * End Audio
let sessionsCount = localStorage.getItem('sessionsCount') ? parseInt(localStorage.getItem('sessionsCount')) : 0;
sessionDisplay.textContent = `Pomodoro Sessions Completed: ${sessionsCount}`;

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

    let timeLeft = isWorkMode ? 10 : 5;

    // Play the start sound if it's work mode
    if (isWorkMode) {
        startSound.play();
    }

    timerInterval = setInterval(() => {
        timeLeft--;
        displayTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Clear the interval first

             // Play the end sound if it's work mode
            if (isWorkMode) {
                endSound.play();
            }

            if (isWorkMode) {
                sessionsCount++;
                localStorage.setItem('sessionsCount', sessionsCount); // ? Save to localStorage
                sessionDisplay.textContent = `Pomodoro Sessions Completed: ${sessionsCount}`;
            }
            isWorkMode = !isWorkMode; // Then flip the mode
            
            if (isWorkMode) {
                startSound.play();
            }
            startTimer(); // Then start the timer again
        } 
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    isWorkMode = true;
    displayTime(25 * 60);
    // sessionsCount = 0;
    // localStorage.setItem('sessionsCount', sessionsCount); // ? Save to localStorage
}

resetButton.addEventListener('click', resetTimer);




