import { OmokPiece } from "./omok_piece";
import type p5 from "p5";

export enum OmokBoardState {
  EMPTY,
  PLAYER_1_VICTORY,
  PLAYER_2_VICTORY,
  DRAW
}

export class OmokBoard {
  size: number;
  piece_size: number;
  pieces: Array<OmokPiece> = [];
  current_player = 0;
  player_amount: number;
  p: p5;
  
  constructor(p: p5, size: number, piece_size: number, player_amount: number){
    this.p = p;
    this.size = size;
    this.piece_size = piece_size;
    this.player_amount = player_amount;
  }

  draw(){
    this.p.noStroke();
    this.p.background(234, 221, 202);

    for (let x = 0; x < this.size; x++){
      this.p.stroke(0);
      this.p.line((x+.45) * this.piece_size, 0, (x+.45) * this.piece_size, this.p.height); 
      this.p.line(0, (x+.45) * this.piece_size, this.p.width, (x+.45) * this.piece_size); 
    }

    for (const piece of this.pieces)
      piece.draw();
  }

  

  place_piece(mouse_x: number, mouse_y: number){
    const x = Math.floor(mouse_x / this.piece_size) * this.piece_size;
    const y = Math.floor(mouse_y / this.piece_size) * this.piece_size;

    this.pieces.push(new OmokPiece(this.p, x, y, this.piece_size, this.current_player));

    this.current_player = (this.current_player+1) % this.player_amount;

    this.pieces[this.pieces.length-1].draw();
  }

  highlight_piece_position(mouse_x: number, mouse_y: number){
    const x = Math.floor(mouse_x / this.piece_size) * this.piece_size;
    const y = Math.floor(mouse_y / this.piece_size) * this.piece_size;
    this.p.fill(0, 0);
    this.p.stroke(0);
    this.p.ellipse(x+this.piece_size/2, y+this.piece_size/2, this.piece_size, this.piece_size);
  }
}