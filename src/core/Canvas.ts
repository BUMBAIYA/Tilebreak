export class Canvas {
  canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;

  constructor(parent: HTMLElement) {
    this.canvas = document.createElement("canvas");
    parent.appendChild(this.canvas);
    this.#ctx = this.canvas.getContext("2d")!;
  }

  getContext2D() {
    return this.#ctx;
  }
}
