import type { RoughCanvas } from "roughjs/bin/canvas";
import type { Drawable } from "roughjs/bin/core";

export class OmokPiece {
  pieceNumber: number;
  _circle: Drawable;

  constructor(
    private canvas: RoughCanvas,
    public x: number,
    public y: number,
    public size: number,
    public player: number) {
      this._circle = this.canvas.circle(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, {
        fill: (this.player == 0) ? 'black' : 'white',
        fillStyle: 'solid'
      });
    }

  get circle() {
    return this._circle;
  }
}