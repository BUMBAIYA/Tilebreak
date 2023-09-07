export class Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
  color: string;

  #isHit: boolean = false;

  static #ctx: CanvasRenderingContext2D;

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
    if (!this.#isHit) {
      Rectangle.#ctx.beginPath();
      Rectangle.#ctx.rect(this.x, this.y, this.width, this.height);
      Rectangle.#ctx.fillStyle = this.color;
      Rectangle.#ctx.fill();
      Rectangle.#ctx.stroke();
      Rectangle.#ctx.closePath();
    }
  }

  update() {
    this.draw();
  }

  setIsHit() {
    this.#isHit = true;
  }

  static setContext2D(ctx: CanvasRenderingContext2D) {
    Rectangle.#ctx = ctx;
  }
}
