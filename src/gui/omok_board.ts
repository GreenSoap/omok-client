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
  piece_offset: number;
  p: p5;
  
  constructor(p: p5, size: number, piece_size: number, piece_offset: number, player_amount: number){
    this.p = p;
    this.size = size;
    this.piece_size = piece_size;
    this.player_amount = player_amount;
    this.piece_offset = piece_offset;
  }

  draw(){
    this.p.noStroke();
    this.p.background(234, 221, 202);

    for (let x = 0; x < this.size; x++){
      this.p.stroke(0);
      this.p.line((x+this.piece_offset) * this.piece_size, 0, (x+this.piece_offset) * this.piece_size, this.p.height); 
      this.p.line(0, (x+this.piece_offset) * this.piece_size, this.p.width, (x+this.piece_offset) * this.piece_size); 
    }

    for (const piece of this.pieces)
      piece.draw();
  }

  

  place_piece(mouse_x: number, mouse_y: number){
    const piece_x = Math.floor(mouse_x / this.piece_size);
    const piece_y = Math.floor(mouse_y / this.piece_size);

    if (piece_x > this.size || piece_y > this.size ||
      piece_x < 0 || piece_y < 0)
      return false;
    
    this.pieces.push(new OmokPiece(this.p, piece_x  * this.piece_size, piece_y  * this.piece_size, this.piece_size, this.current_player));
    this.current_player = (this.current_player+1) % this.player_amount;
    this.pieces[this.pieces.length-1].draw();

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