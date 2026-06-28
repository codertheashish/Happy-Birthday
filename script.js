// ===================================================
// BIRTHDAY SURPRISE — script.js
// ===================================================

// ===== PAGE NAVIGATION =====
function transitionTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    target.classList.add('active');

    if (pageId === 'curtain-page') {
        setTimeout(() => {
            document.getElementById('stage').classList.add('open');
            startSparkles('message-card');
        }, 1000);
    }

    if (pageId === 'gallery-page') {
        startGalleryEffects();
    }
}

// ===== HEART PARTICLES =====
function createHeart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const heart = document.createElement('div');
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-10vh';
    heart.style.color = 'var(--accent)';
    heart.innerHTML = '❤️';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.animation = `floatHeart ${Math.random() * 3 + 3}s linear forwards`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

// Continuous heart rain for hero & slider
setInterval(() => createHeart('particle-container'), 300);
setInterval(() => createHeart('slider-particles'), 400);

// ===== SLIDER LOGIC =====
function nextStep(step) {
    document.querySelectorAll('.step-content').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    document.getElementById(`dot-${step}`).classList.add('active');
}

function finishSlider() {
    transitionTo('celebration-page');
}

// ===== CELEBRATION FLOW =====
let celebStep = 1;

function celebFlow() {
    const btn  = document.getElementById('celeb-master-btn');
    const hint = document.getElementById('celeb-hint');
    const page = document.getElementById('celebration-page');
    const lights = document.getElementById('fairy-lights-container');

    if (celebStep === 1) {
        // Step 1 — Turn on lights
        page.classList.add('bright');
        lights.style.opacity = '1';
        hint.innerText = 'Music makes it better...';
        btn.innerText = '🎵 Play Music';
        celebStep = 2;

    } else if (celebStep === 2) {
        // Step 2 — Play music
        const audio = document.getElementById('birthday-audio');
        audio.play().catch(() => {});
        hint.innerText = 'Let the colors fly!';
        btn.innerText = '🎈 Fly Balloons';
        celebStep = 3;

    } else if (celebStep === 3) {
        // Step 3 — Balloons
        spawnBalloons(document.body);
        hint.innerText = 'Almost there...';
        btn.innerText = '✨ Show The Message';
        celebStep = 4;

    } else {
        // Step 4 — Open curtain
        transitionTo('curtain-page');
    }
}

// ===== REALISTIC BALLOONS =====
function spawnBalloons(targetContainer) {
    const colorGradients = [
        ['#ff2d55', '#800020'],
        ['#74b9ff', '#0984e3'],
        ['#55efc4', '#00b894'],
        ['#ffeaa7', '#fdcb6e'],
        ['#a29bfe', '#6c5ce7'],
        ['#ff9ff3', '#f368e0']
    ];

    const interval = setInterval(() => {
        const b     = document.createElement('div');
        const shine = document.createElement('div');

        b.classList.add('balloon');
        shine.classList.add('balloon-shine');

        const gradient = colorGradients[Math.floor(Math.random() * colorGradients.length)];
        b.style.left = Math.random() * 95 + 'vw';
        b.style.background = `radial-gradient(circle at 70% 30%, ${gradient[0]}, ${gradient[1]})`;
        b.style.boxShadow = `inset -10px -10px 20px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.2)`;

        b.appendChild(shine);
        targetContainer.appendChild(b);
        setTimeout(() => b.remove(), 8000);
    }, 400);

    setTimeout(() => clearInterval(interval), 6000);
}

// ===== GALLERY EFFECTS =====
function startGalleryEffects() {
    const container = document.getElementById('gallery-bg-elements');

    // Periodic balloon bursts in gallery background
    setInterval(() => {
        if (document.getElementById('gallery-page').classList.contains('active')) {
            spawnBalloons(container);
        }
    }, 8000);

    // Random sparkle dots
    setInterval(() => {
        if (document.getElementById('gallery-page').classList.contains('active')) {
            const s = document.createElement('div');
            s.classList.add('gallery-sparkle');
            s.style.width  = s.style.height = (Math.random() * 6 + 2) + 'px';
            s.style.top    = Math.random() * 100 + '%';
            s.style.left   = Math.random() * 100 + '%';
            container.appendChild(s);
            setTimeout(() => s.remove(), 2000);
        }
    }, 200);
}

// ===== SPARKLES ON MESSAGE CARD =====
function startSparkles(targetId) {
    const card = document.getElementById(targetId);
    setInterval(() => {
        const s = document.createElement('div');
        s.classList.add('sparkle-particle');
        s.style.width  = s.style.height = (Math.random() * 4 + 2) + 'px';
        s.style.top    = Math.random() * 100 + '%';
        s.style.left   = Math.random() * 100 + '%';
        card.appendChild(s);
        setTimeout(() => s.remove(), 1000);
    }, 50);
}

// ===== FAIRY LIGHTS INIT =====
function initFairyLights() {
    const container  = document.getElementById('fairy-lights-container');
    const path       = document.getElementById('wire-path');
    const pathLength = path.getTotalLength();
    const bulbCount  = 25;

    for (let i = 0; i <= bulbCount; i++) {
        const distance = (i / bulbCount) * pathLength;
        const point    = path.getPointAtLength(distance);

        const bulb = document.createElement('div');
        bulb.classList.add('bulb-teardrop');
        bulb.style.left = `${(point.x / 1000) * 100}%`;
        bulb.style.top  = `${point.y}px`;
        bulb.style.setProperty('--d', `${0.5 + Math.random() * 2}s`);
        container.appendChild(bulb);
    }
}

// ===== ON LOAD =====
window.onload = () => {
    initFairyLights();
};
