// Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainContainer = document.getElementById('mainContainer');
const celebrationContainer = document.getElementById('celebrationContainer');
const heartsContainer = document.getElementById('heartsContainer');

// Track how many times they've tried to click no
let noClickAttempts = 0;

// Messages when they try to click no
const noMessages = [
    "No 😢",
    "Are you sure? 🥺",
    "Really sure? 😭",
    "Think again! 💔",
    "Please? 🙏",
    "Don't do this! 😿",
    "I'll be sad! 😢",
    "Give me a chance! 💝",
    "Pretty please? 🌹",
    "Last chance! 💕"
];

// Create floating hearts in background
function createBackgroundHearts() {
    const hearts = ['💖', '💕', '💗', '💓', '💝', '❤️', '💘', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 300);
}

// Make the No button run away
function moveNoButton() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate new random position
    let newX = Math.random() * (viewportWidth - btnRect.width - 100) + 50;
    let newY = Math.random() * (viewportHeight - btnRect.height - 100) + 50;
    
    // Apply position
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.zIndex = '50';
    noBtn.style.transition = 'all 0.2s ease';
    
    // Update button text
    noClickAttempts++;
    if (noClickAttempts < noMessages.length) {
        noBtn.textContent = noMessages[noClickAttempts];
    } else {
        noBtn.textContent = "Fine, just say YES! 💖";
    }
    
    // Make Yes button grow each time
    yesBtn.classList.add('growing');
    const currentScale = 1 + (noClickAttempts * 0.1);
    yesBtn.style.transform = `scale(${Math.min(currentScale, 1.8)})`;
}

// Handle No button hover and click
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Create confetti explosion
function createConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 20);
    }
}

// Handle Yes button click
yesBtn.addEventListener('click', () => {
    // Hide main container
    mainContainer.style.display = 'none';
    
    // Show celebration
    celebrationContainer.classList.remove('hidden');
    
    // Create confetti celebration
    createConfetti();
    
    // Keep creating confetti periodically
    setInterval(createConfetti, 3000);
});

// Start the background hearts
createBackgroundHearts();

// Add some sparkle to the page
console.log('💕 Made with love 💕');
