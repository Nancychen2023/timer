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

// 分类菜单交互
const categoryItems = document.querySelectorAll('.category-menu li');
categoryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // 这里可以添加显示子菜单的逻辑
    });
});

// 轮播图
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slider img');
const dots = document.querySelectorAll('.banner-dots span');

function showSlide(index) {
    slides.forEach(slide => slide.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].style.display = 'block';
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// 自动轮播
setInterval(nextSlide, 3000);

// 点击切换轮播图
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// 倒计时功能
function updateCountdown() {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59);
    
    const diff = end - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.querySelector('.time-box:nth-child(2)').textContent = String(hours).padStart(2, '0');
    document.querySelector('.time-box:nth-child(4)').textContent = String(minutes).padStart(2, '0');
    document.querySelector('.time-box:nth-child(6)').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 搜索框焦点效果
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('focus', () => {
    searchInput.parentElement.style.boxShadow = '0 0 0 2px rgba(225, 37, 27, 0.2)';
});

searchInput.addEventListener('blur', () => {
    searchInput.parentElement.style.boxShadow = 'none';
});

// 返回顶部
const backToTop = document.createElement('div');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 