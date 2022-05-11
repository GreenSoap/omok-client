import { OmokPiece } from "./omok_piece";
import type p5 from "p5";
import type { RoughCanvas } from "roughjs/bin/canvas";
import type { Drawable } from "roughjs/bin/core";

export class OmokBoardView {
  pieces = new Map<string, OmokPiece>();
  image: p5.Image;
  rough_canvas: RoughCanvas;
  lines: Array<Drawable> = [];

  constructor(
    public p: p5,
    public size: number,
    public piece_size: number,
    public piece_offset: number,
    public player_amount: number,
    public size_px: number,
    public image_path: string) {
  }

  initialize(rough_canvas: RoughCanvas) {
    this.rough_canvas = rough_canvas;

    // this.image = this.p.loadImage(this.image_path);

    for (let x = 0; x < this.size; x++) {
      const props = {
        strokeWidth: 0,
        roughness: 0,
        bowing: 0,
        stroke: 'black'
      }
      const y_line = this.rough_canvas.line((x + this.piece_offset) * this.piece_size, 0, (x + this.piece_offset) * this.piece_size, this.size_px, props);
      const x_line = this.rough_canvas.line(0, (x + this.piece_offset) * this.piece_size, this.size_px, (x + this.piece_offset) * this.piece_size);

      this.lines.push(y_line);  // y
      this.lines.push(x_line);  // x
    }

  }

  draw() {
    this.p.background(234, 221, 202);
    //this.p.image(this.image, 0, 0, this.size*this.piece_size, this.size*this.piece_size);
    this.p.strokeWeight(1.25);

    this.lines.forEach(line => {
      this.rough_canvas.draw(line);
    });
    this.pieces.forEach(piece => {
      this.rough_canvas.draw(piece.circle);
    });
  }

  get_piece_coordinate(mouse_x: number, mouse_y: number) {
    const piece_x = Math.floor(mouse_x / this.piece_size);
    const piece_y = Math.floor(mouse_y / this.piece_size);

    return [piece_x, piece_y];
  }

  place_piece(piece_x: number, piece_y: number, player: number) {
    const piece = new OmokPiece(this.rough_canvas, piece_x * this.piece_size, piece_y * this.piece_size, this.piece_size, player);
    this.pieces.set(`${piece_x},${piece_y}`, piece);
    this.rough_canvas.draw(piece.circle);
  }

  can_place_piece(piece_x: number, piece_y: number) {
    return (!(this.pieces.has(`${piece_x},${piece_y}`) ||
      piece_x >= this.size || piece_y >= this.size ||
      piece_x < 0 || piece_y < 0))
  }

  highlight_piece_position(mouse_x: number, mouse_y: number) {
    const x = Math.floor(mouse_x / this.piece_size) * this.piece_size;
    const y = Math.floor(mouse_y / this.piece_size) * this.piece_size;
    this.rough_canvas.ellipse(x + this.piece_size / 2, y + this.piece_size / 2, this.piece_size, this.piece_size);
  }
}