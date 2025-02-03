// 获取DOM元素
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// 计时器变量
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// 更新显示时间的函数
function updateDisplay() {
    const time = new Date(elapsedTime);
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(time.getMilliseconds() / 10)).padStart(2, '0');

    minutesDisplay.textContent = minutes;
    secondsDisplay.textContent = seconds;
    millisecondsDisplay.textContent = milliseconds;
}

// 开始计时
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.classList.add('paused');
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    } else {
        isRunning = false;
        startBtn.classList.remove('paused');
        clearInterval(timerInterval);
    }
}

// 重置计时器
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.classList.remove('paused');
    elapsedTime = 0;
    updateDisplay();
}

// 事件监听
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// 初始化显示
updateDisplay(); 