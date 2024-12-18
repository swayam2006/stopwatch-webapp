let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

const timeDisplay = document.querySelector(".time-display");
const startPauseBtn = document.getElementById("start-pause-btn");
const resetBtn = document.getElementById("reset-btn");

function formatTime(time) {
  const ms = time % 1000;
  const s = Math.floor((time / 1000) % 60);
  const m = Math.floor((time / (1000 * 60)) % 60);
  const h = Math.floor((time / (1000 * 60 * 60)) % 24);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(ms).padStart(3, "0")}`;
}

function updateDisplay() {
  const currentTime = Date.now() - startTime + elapsedTime;
  timeDisplay.textContent = formatTime(currentTime);
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateDisplay, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
  elapsedTime += Date.now() - startTime;
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  timeDisplay.textContent = "00:00:00:000";
  startPauseBtn.textContent = "Start";
}

startPauseBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    startPauseBtn.textContent = "Pause";
  } else {
    pauseTimer();
    startPauseBtn.textContent = "Start";
  }
  isRunning = !isRunning;
});

resetBtn.addEventListener("click", resetTimer);
