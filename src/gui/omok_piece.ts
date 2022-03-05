import type p5 from "p5";

export enum OmokPieceState {
  EMPTY,
  PLAYER_1_PIECE,
  PLAYER_2_PIECE
}

export class OmokPiece {
  x: number; 
  y: number;
  size: number;
  pieceNumber: number;
  color: p5.Color;
  p: p5;
  state: OmokPieceState = OmokPieceState.EMPTY;

  constructor (p: p5, x: number, y: number, size: number){
    this.x = x;
    this.y = y;
    this.size = size;
    this.p = p;
    this.color = this.p.color(255, 100);
  }

  draw(){
    this.p.noStroke();
    this.p.rect(this.x, this.y, this.size, this.size);

    this.p.stroke(0);
    this.p.line(this.x+this.size/2, this.y, this.x+this.size/2, this.y+this.size);

    this.p.stroke(0);
    this.p.line(this.x, this.y+this.size/2, this.x+this.size, this.y+this.size/2);
  }

  clicked(is_player_one = true){
    if (this.state != OmokPieceState.EMPTY) 
      return false;
    
    this.state = (is_player_one) ? OmokPieceState.PLAYER_1_PIECE : OmokPieceState.PLAYER_2_PIECE;
    this.p.fill((is_player_one) ? 0 : 255);
    this.p.circle(this.x+this.size/2, this.y+this.size/2, this.size/2);
    return true;
  }

  is_within_boundary(x: number, y: number){
    return (
    (x < this.x+this.size) && (x > this.x) && 
    (y < this.y+this.size) && (y > this.y));
  }
}