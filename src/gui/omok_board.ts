import { OmokPiece } from "./omok_piece";
import type p5 from "p5";

export class OmokBoardView {
  pieces = new Map<string, OmokPiece>();
  image: p5.Image;
  constructor(
    public p: p5, 
    public size: number, 
    public piece_size: number, 
    public piece_offset: number, 
    public player_amount: number,
    public size_px: number,
    public image_path: string){
  }

  preload(){
    this.image = this.p.loadImage(this.image_path);
  }

  draw(){
    this.p.noStroke();
    // this.p.background(234, 221, 202);
    this.p.image(this.image, 0, 0, this.size*this.piece_size, this.size*this.piece_size);


    for (let x = 0; x < this.size; x++){
      this.p.stroke(0, 100);
      this.p.strokeWeight(1.25);
      this.p.line((x+this.piece_offset) * this.piece_size, 0, (x+this.piece_offset) * this.piece_size, this.size_px);  // y
      this.p.line(0, (x+this.piece_offset) * this.piece_size, this.size_px, (x+this.piece_offset) * this.piece_size);  // x
    }

    this.pieces.forEach(piece => {
      piece.draw();
    });
  }

  get_piece_coordinate(mouse_x: number, mouse_y: number){
    const piece_x = Math.floor(mouse_x / this.piece_size);
    const piece_y = Math.floor(mouse_y / this.piece_size);

    return [piece_x, piece_y];
  }

  place_piece(piece_x: number, piece_y: number, player: number){
    if (this.pieces.has(`${piece_x},${piece_y}`) ||
      piece_x >= this.size || piece_y >= this.size ||
      piece_x < 0 || piece_y < 0)
      return false;

    this.pieces.set(`${piece_x},${piece_y}`, new OmokPiece(this.p, piece_x  * this.piece_size, piece_y  * this.piece_size, this.piece_size, player));
    this.pieces.get(`${piece_x},${piece_y}`).draw();

    return true;
  }

  highlight_piece_position(mouse_x: number, mouse_y: number){
    const x = Math.floor(mouse_x / this.piece_size) * this.piece_size;
    const y = Math.floor(mouse_y / this.piece_size) * this.piece_size;
    this.p.fill(0, 0);
    this.p.stroke(0);
    this.p.ellipse(x+this.piece_size/2, y+this.piece_size/2, this.piece_size, this.piece_size);
  }
}