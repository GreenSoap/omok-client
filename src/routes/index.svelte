<script lang="ts">
  import p5 from "p5";

  class OmokPiece {
    x: number; 
    y: number;
    size: number;
    pieceNumber: number;
    color: p5.Color;
    p: p5;

    constructor (p: p5, x: number, y: number, size: number){
      this.x = x;
      this.y = y;
      this.size = size;
      this.p = p;
      this.color = this.p.color(255, 100);
    }

    draw(){
      this.p.fill(this.color);
      this.p.stroke(255, 0);
      this.p.rect(this.x, this.y, this.size, this.size);

      this.p.stroke(0);
      this.p.line(this.x+this.size/2, this.y, this.x+this.size/2, this.y+this.size);

      this.p.stroke(0);
      this.p.line(this.x, this.y+this.size/2, this.x+this.size, this.y+this.size/2);
    }

    clicked(){
      this.p.fill(0);
      this.p.circle(this.x+this.size/2, this.y+this.size/2, this.size/2);
    }

    is_within_boundary(x: number, y: number){
      return (
      (x < this.x+this.size) && (x > this.x) && 
      (y < this.y+this.size) && (y > this.y));
    }
  }

  //const omok_board = new OmokBoard(5, 50);

  const omok_board = (p: p5) => {
    const board_side_pieces: number = 5;
    const omok_piece_size: number = 100;
    const omok_piece_radius = new p5.Vector(omok_piece_size, omok_piece_size);

    const pieces: Array<Array<OmokPiece>> = [];
    p.setup = () => {
      p.noStroke();
      p.createCanvas(700, 700);
      p.frameRate(0);
      let pieceNumber = 1;
      for (let x = 0; x < board_side_pieces; x++){
        pieces[x] = [];
        for (let y = 0; y < board_side_pieces; y++){
          pieces[x][y] = new OmokPiece(p, x * omok_piece_size, y * omok_piece_size, omok_piece_size); 
          pieces[x][y].pieceNumber = pieceNumber;
          pieces[x][y].draw();
          pieceNumber++;
        }
      }
    }

    p.draw = () => {
      p.strokeWeight(1);
      for (let x = 0; x < board_side_pieces; x++)
        for (let y = 0; y < board_side_pieces; y++)
          pieces[x][y].draw();

      p.strokeWeight(4);
      p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    }

    p.mouseClicked = (event: any) => {        
      for (let x = 0; x < board_side_pieces; x++){
        for (let y = 0; y < board_side_pieces; y++){
          if (pieces[x][y].is_within_boundary(event.x, event.y)){
            pieces[x][y].clicked();
            return;
          }
        }
      }
    }
  }

  const myp5 = new p5(omok_board);

</script>