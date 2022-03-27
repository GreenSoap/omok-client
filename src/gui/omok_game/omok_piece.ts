import type p5 from "p5";
import type { RoughCanvas } from "roughjs/bin/canvas";

export class OmokPiece {
  pieceNumber: number;

  constructor(private rough_canvas: RoughCanvas,
    public x: number,
    public y: number,
    public size: number,
    public player: number) { }

  draw() {
    this.rough_canvas.circle(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, {
      fill: (this.player == 0) ? 'black' : 'white',
      fillStyle: 'solid'
    });
  }
}