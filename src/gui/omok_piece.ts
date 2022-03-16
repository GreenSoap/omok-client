import type p5 from "p5";

export class OmokPiece {
  x: number; 
  y: number;
  size: number;
  pieceNumber: number;
  p: p5;
  player: number;

  constructor (p: p5, x: number, y: number, size: number, player: number){
    this.x = x;
    this.y = y;
    this.size = size;
    this.p = p;
    this.player = player;
  }

  draw(){
    this.p.fill((this.player == 0) ? 0 : 255);
    this.p.circle(this.x+this.size/2, this.y+this.size/2, this.size/2);
  }
}