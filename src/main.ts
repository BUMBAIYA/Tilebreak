import { Circle } from "./core/Circle";
import { Rectangle } from "./core/Rectangle";
import { checkCollisionCircleRectangle } from "./core/collision";
import { Paddle, PaddleDirection } from "./core/Paddle";

const FPS = {
  30: 33.33,
  60: 16.67,
  90: 11.11,
  120: 8.33,
} as const;

const TILE_COUNT = {
  x: 4,
  y: 3,
} as const;

const PADDLE_SPEED = 10 as const;

enum GameState {
  PAUSE,
  START,
  END,
}

let animationID: number;
let gameState: GameState = GameState.PAUSE;

let canvasWidth: number = 0;
let canvasHeight: number = 0;

let paddleMove: PaddleDirection = PaddleDirection.NONE;

let lastTimestamp: number = 0;
let endTimer = 0;

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const controls = document.getElementById("controls");

const dpr = window.devicePixelRatio || 1;

let ball: Circle;
let paddle: Paddle;
let tiles: Rectangle[] = [];

function populateCanvas() {
  let paddleWidth = canvasWidth * 0.2;
  paddle = new Paddle(
    paddleWidth,
    25,
    canvasWidth / 2 - paddleWidth,
    canvasHeight - 50,
    PADDLE_SPEED,
    0,
    "red"
  );
  ball = new Circle(
    canvasWidth / 2,
    canvasHeight * 0.3,
    20,
    Math.random() > 0.5 ? -5 : 5,
    6,
    "blue"
  );
  let tileGap = Math.floor(canvasWidth * 0.08);
  let tileWidth = Math.floor(
    (canvasWidth - tileGap * (TILE_COUNT.x + 1)) / TILE_COUNT.x
  );
  for (let x = 0; x < TILE_COUNT.x; x++) {
    const tile = new Rectangle(
      tileWidth,
      40,
      tileGap + (tileGap + tileWidth) * x,
      100,
      0,
      0,
      "orange"
    );
    tiles.push(tile);
    tile.draw();
  }
  ball.draw();
  paddle.draw();
}

function init() {
  canvasWidth = Math.floor(window.innerWidth) - 5;
  canvasHeight = Math.floor(window.innerHeight) - 5;
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  ctx.scale(dpr, dpr);

  Circle.setContext2D(ctx);
  Circle.setCanvasDimension(canvasWidth, canvasHeight);
  Rectangle.setContext2D(ctx);
  Paddle.setContext2D(ctx);
  Paddle.setCanvasDimension(canvasWidth);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawCanvas(timestamp: number) {
  const deltaTime = timestamp - lastTimestamp;

  if (tiles.length === 0) {
    endTimer += 1;
    if (endTimer > 70) {
      if (gameState !== GameState.END) {
        controls?.classList.toggle("hidden");
        gameState = GameState.END;
      }
    }
  }

  if (deltaTime >= FPS[90]) {
    clearCanvas();
    for (const [i, tile] of tiles.entries()) {
      tile.draw();
      const isHit = checkCollisionCircleRectangle(ball, tile);
      if (isHit) {
        tile.setIsHit();
        tiles.splice(i, 1);
      }
    }
    if (gameState === GameState.START) {
      ball.update();
      paddle.move(paddleMove);
      checkCollisionCircleRectangle(ball, paddle);
    }
    paddle.draw();
    ball.draw();
    lastTimestamp = timestamp;
  }
  animationID = requestAnimationFrame(drawCanvas);
}

init();
populateCanvas();

window.addEventListener("resize", () => {
  init();
});

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight": {
      paddleMove = PaddleDirection.RIGHT;
      break;
    }
    case "ArrowLeft": {
      paddleMove = PaddleDirection.LEFT;
      break;
    }
    case " ": {
      if (gameState === GameState.START) {
        gameState = GameState.PAUSE;
        pauseGame();
        controls?.classList.toggle("hidden");
      } else {
        gameState = GameState.START;
        startGame();
        controls?.classList.toggle("hidden");
      }
      break;
    }
    case "R": {
      if (gameState !== GameState.START) {
        controls?.classList.add("hidden");
        resetGame();
      }
      break;
    }
    case "r": {
      if (gameState !== GameState.START) {
        controls?.classList.add("hidden");
        resetGame();
      }
      break;
    }
    default: {
      return;
    }
  }
});

window.addEventListener("keyup", () => {
  paddleMove = PaddleDirection.NONE;
});

const startGame = () => {
  requestAnimationFrame(drawCanvas);
};

const pauseGame = () => {
  cancelAnimationFrame(animationID);
};

const resetGame = () => {
  if (gameState === GameState.PAUSE || GameState.END) {
    tiles = [];
    endTimer = 0;
    gameState = GameState.PAUSE;
    clearCanvas();
    populateCanvas();
  }
  startGame();
  controls?.classList.add("hidden");
  gameState = GameState.START;
};

const resumeBtn = document.getElementById("resume_btn");
const resetBtn = document.getElementById("reset_btn");

resumeBtn?.addEventListener("click", () => {
  if (gameState === GameState.END) {
    resetGame();
    return;
  }
  startGame();
  gameState = GameState.START;
  controls?.classList.toggle("hidden");
});

resetBtn?.addEventListener("click", () => {
  resetGame();
});
