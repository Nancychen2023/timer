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

// 聊天机器人控制
const chatToggle = document.getElementById('chatToggle');
const chatContainer = document.getElementById('chatContainer');

chatToggle.addEventListener('click', () => {
    chatContainer.classList.toggle('hidden');
});

// 商品分类标签切换
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // 这里可以添加商品筛选逻辑
    });
});

// 商品卡片悬停效果
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // 向下滚动
        header.style.transform = 'translateY(-100%)';
    } else {
        // 向上滚动
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// 订阅表单处理
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // 这里可以添加订阅逻辑
        alert('感谢订阅！我们会将最新资讯发送到您的邮箱：' + email);
        newsletterForm.reset();
    });
}

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

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