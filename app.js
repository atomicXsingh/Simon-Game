const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let playerSequence = [];
let waitingForInput = false;
let level = 1;
let score = 0;

const colorElements = {
    red: document.getElementById('red'),
    green: document.getElementById('green'),
    blue: document.getElementById('blue'),
    yellow: document.getElementById('yellow')
};

const levelDisplay = document.getElementById('level-display');
const scoreDisplay = document.getElementById('score-display');

function flashColor(color) {
    colorElements[color].style.opacity = '0.5';
    setTimeout(() => {
        colorElements[color].style.opacity = '1';
    }, 500);
}

function playSequence() {
    waitingForInput = false;
    let i = 0;
    const interval = setInterval(() => {
        flashColor(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            waitingForInput = true;
        }
    }, 1000);
}

function addColorToSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    playSequence();
}

function resetGame() {
    level = 1;
    score = 0;
    sequence = [];
    playerSequence = [];
    updateLevelDisplay();
    updateScoreDisplay();
    addColorToSequence();
}

function updateLevelDisplay() {
    levelDisplay.textContent = `Level: ${level}`;
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function checkPlayerInput() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            alert('Game Over! Press OK to restart.');
            resetGame();
            return;
        }
    }

    if (playerSequence.length === sequence.length) {
        playerSequence = [];
        score += level * 10;
        level++;
        updateLevelDisplay();
        updateScoreDisplay();
        addColorToSequence();
    }
}

document.querySelectorAll('.color').forEach(colorElement => {
    colorElement.addEventListener('click', (e) => {
        if (waitingForInput) {
            const color = e.target.id;
            playerSequence.push(color);
            flashColor(color);
            checkPlayerInput();
        }
    });
});

document.getElementById('start-button').addEventListener('click', resetGame);

resetGame();
