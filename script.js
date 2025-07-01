const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = "RIGHT";

let food = {
  x: Math.floor(Math.random() * 19) * box,
  y: Math.floor(Math.random() * 19) * box
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Move Snake
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  // Game Over - Wall or Self
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(game);
    alert("Game Over!");
    return;
  }

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box
    };
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

let game = setInterval(draw, 100);
