export class Circle {
  x: number;
  y: number;
  radius: number;

  dx: number;
  dy: number;

  color: string;

  static #ctx: CanvasRenderingContext2D;
  static #canvasWidth: number = 300;
  static #canvasHeight: number = 100;

  constructor(
    x: number,
    y: number,
    radius: number,
    dx: number,
    dy: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  draw(): void {
    Circle.#ctx.beginPath();
    Circle.#ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    Circle.#ctx.fillStyle = this.color;
    Circle.#ctx.fill();
    Circle.#ctx.stroke();
    Circle.#ctx.closePath();
  }

  update(): void {
    this.x += this.dx;
    this.y += this.dy;
    if (
      this.x + this.radius > Circle.#canvasWidth ||
      this.x - this.radius < 0
    ) {
      this.dx *= -1;
    }
    if (
      this.y + this.radius > Circle.#canvasHeight ||
      this.y - this.radius < 0
    ) {
      this.dy *= -1;
    }
  }

  static setContext2D(ctx: CanvasRenderingContext2D) {
    Circle.#ctx = ctx;
  }

  static setCanvasDimension(width: number, height: number) {
    Circle.#canvasWidth = width;
    Circle.#canvasHeight = height;
  }
}
