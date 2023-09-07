export enum PaddleDirection {
  NONE,
  RIGHT,
  LEFT,
}

export class Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
  color: string;

  static #ctx: CanvasRenderingContext2D;
  static #canvasWidth: number = 300;

  constructor(
    width: number,
    height: number,
    x: number,
    y: number,
    dx: number,
    dy: number,
    color: string = "black"
  ) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  draw() {
    Paddle.#ctx.beginPath();
    Paddle.#ctx.rect(this.x, this.y, this.width, this.height);
    Paddle.#ctx.fillStyle = this.color;
    Paddle.#ctx.fill();
    Paddle.#ctx.closePath();
  }

  update() {
    this.draw();
  }

  move(direction: PaddleDirection) {
    if (direction !== null) {
      if (direction === PaddleDirection.LEFT && this.x - this.dx > 0) {
        this.x -= this.dx;
      } else if (
        direction === PaddleDirection.RIGHT &&
        this.x < Paddle.#canvasWidth - this.width - this.height / 2
      ) {
        this.x += this.dx;
      }
    }
  }

  static setContext2D(ctx: CanvasRenderingContext2D) {
    Paddle.#ctx = ctx;
  }

  static setCanvasDimension(width: number) {
    Paddle.#canvasWidth = width;
  }
}
