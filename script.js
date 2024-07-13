let startTime, updatedTime, difference, tInterval, running = false;
let lapTimes = [];

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const lapTimesElement = document.getElementById('lapTimes');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    lapTimes = [];
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    millisecondsElement.textContent = '00';
    lapTimesElement.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = `${minutesElement.textContent}:${secondsElement.textContent}:${millisecondsElement.textContent}`;
        lapTimes.push(lapTime);
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapTimesElement.appendChild(li);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    minutesElement.textContent = (minutes < 10) ? '0' + minutes : minutes;
    secondsElement.textContent = (seconds < 10) ? '0' + seconds : seconds;
    millisecondsElement.textContent = (milliseconds < 10) ? '0' + milliseconds : milliseconds;
}
