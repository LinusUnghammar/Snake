const canvas = document.querySelector("#game-box");
const context = canvas.getContext("2d");

let grid = 16;
let count = 0;

let snake = {
  x: 160,
  y: 160,

  dx: grid,
  dy: 0,

  parts: [],

  maxSize: 4,
};
const food = {
  x: 320,
  y: 320,
};

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Game section
function game() {
  requestAnimationFrame(game);
  if (snake.maxSize == 4) {
    foodCount = 0;
  }

  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.parts.unshift({ x: snake.x, y: snake.y });

  if (snake.parts.length > snake.maxSize) {
    snake.parts.pop();
  }

  context.fillStyle = "red";
  context.fillRect(food.x, food.y, grid - 1, grid - 1);

  context.fillStyle = "green";
  snake.parts.forEach(function (part, index) {
    context.fillRect(part.x, part.y, grid - 1, grid - 1);
    if (part.x === food.x && part.y === food.y) {
      snake.maxSize++;
      food.x = getRandomNum(0, 25) * grid;
      food.y = getRandomNum(0, 25) * grid;
    }

    for (let i = index + 1; i < snake.parts.length; i++) {
      if (part.x === snake.parts[i].x && part.y === snake.parts[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.parts = [];
        snake.maxSize = 4;
        snake.dx = grid;
        snake.dy = 0;

        food.x = getRandomNum(0, 25) * grid;
        food.y = getRandomNum(0, 25) * grid;
      }
    }
  });
}

document.addEventListener("keydown", function (e) {
  // left arrow key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// start the game
requestAnimationFrame(game);
