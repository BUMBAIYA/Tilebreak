import { Circle } from "./core/Circle";
import { Canvas } from "./core/Canvas";
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

let canvasWidth: number = 0;
let canvasHeight: number = 0;

let paddleMove: PaddleDirection = PaddleDirection.NONE;

let lastTimestamp: number = 0;

const canvasObj = new Canvas(document.body);
const canvas = canvasObj.canvas;
const ctx = canvasObj.getContext2D();

const dpr = window.devicePixelRatio || 1;

let ball: Circle;
let paddle: Paddle;
let tiles: Rectangle[] = [];

function populateCanvas() {
  paddle = new Paddle(200, 25, 50, canvasHeight - 50, PADDLE_SPEED, 0, "red");
  ball = new Circle(canvasWidth / 2, canvasHeight * 0.3, 20, -6, 6, "blue");
  let tileGap = Math.floor(canvasWidth * 0.08);
  let tileWidth = Math.floor(
    (canvasWidth - tileGap * (TILE_COUNT.x + 1)) / TILE_COUNT.x
  );
  for (let x = 0; x < TILE_COUNT.x; x++) {
    tiles.push(
      new Rectangle(
        tileWidth,
        40,
        tileGap + (tileGap + tileWidth) * x,
        100,
        0,
        0,
        "orange"
      )
    );
  }
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

function drawCanvas(timestamp: number) {
  const deltaTime = timestamp - lastTimestamp;

  if (deltaTime >= FPS[90]) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (const tile of tiles) {
      tile.draw();
      checkCollisionCircleRectangle(ball, tile);
    }
    ball.update();
    paddle.move(paddleMove);
    paddle.update();
    checkCollisionCircleRectangle(ball, paddle);
    lastTimestamp = timestamp;
  }
  requestAnimationFrame(drawCanvas);
}

init();
populateCanvas();
requestAnimationFrame(drawCanvas);

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
    default: {
      return;
    }
  }
});

window.addEventListener("keyup", () => {
  paddleMove = PaddleDirection.NONE;
});
