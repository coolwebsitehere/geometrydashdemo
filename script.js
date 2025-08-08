
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = 200;
let angle = 0;
let darts = [];
let speed = 0.01;
let score = 0;
let gameOver = false;

document.addEventListener("keydown", shoot);
canvas.addEventListener("click", shoot);

function shoot() {
    if (gameOver) return;
    darts.push({ angle: angle, y: canvas.height - 50 });
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawDart(dart) {
    const dartLength = 20;
    const x = centerX + 50 * Math.cos(dart.angle);
    const y = centerY + 50 * Math.sin(dart.angle);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + dartLength * Math.cos(dart.angle), y + dartLength * Math.sin(dart.angle));
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
}

function update() {
    if (gameOver) return;
    angle += speed;
    speed += 0.00005; // slowly increase rotation speed
}

function checkCollision(newAngle) {
    for (let dart of darts) {
        if (Math.abs(dart.angle - newAngle) < 0.15) return true;
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    for (let dart of darts) {
        drawDart(dart);
    }
}

function gameLoop() {
    update();
    draw();
    if (darts.length > 0) {
        let last = darts[darts.length - 1];
        if (last.y > centerY) {
            last.y -= 10;
        } else {
            let hit = checkCollision(angle);
            if (hit) {
                document.getElementById("gameOverText").innerText = "💥 Game Over! Final Score: " + score;
                gameOver = true;
            } else {
                last.angle = angle;
                score++;
                document.getElementById("score").innerText = "Score: " + score;
            }
        }
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();
