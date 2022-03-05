<h1>omok.io</h1>

<canvas id="omok-game"></canvas>

<script lang="ts">
  import p5 from "p5";

  class OmokBoard {
    board_size: number;
    omok_piece_size: number;
    pieces: Array<Array<OmokPiece>> = [];
    p: p5
    constructor(p: p5, board_size: number, omok_piece_size: number){
      this.p = p;  
      this.board_size = board_size;
      this.omok_piece_size = omok_piece_size;
    }

    draw(){
      for (let x = 0; x < this.board_size; x++){
        this.pieces[x] = [];
        for (let y = 0; y < this.board_size; y++){
          this.pieces[x][y] = new OmokPiece(this.p, x * 25, y * this.omok_piece_size, this.omok_piece_size); 
          this.pieces[x][y].draw();
        }
      }
    }
  }



  class OmokPiece {
    x: number; 
    y: number;
    size: number;
    p: p5;

    constructor (p: p5, x: number, y: number, size: number){
      this.x = x;
      this.y = y;
      this.size = size;
      this.p = p;
    }

    draw(){
      this.p.stroke(255);
      this.p.rect(this.x, this.y, this.size, this.size);

      this.p.stroke(0);
      this.p.line(this.x+this.size/2, this.y, this.x+this.size/2, this.y+this.size);

      this.p.stroke(0);
      this.p.line(this.x, this.y+this.size/2, this.x+this.size, this.y+this.size/2);
    }
  }

  const omok_game = function(p: p5){
      p.setup = function(){
        p.noStroke();
        p.noSmooth();
        p.createCanvas(700, 410);
      }
      
      p.draw = function(){
        const omokBoard = new OmokBoard(p, 19, 25);
        omokBoard.draw();
      }
    }
  const myp5 = new p5(omok_game);

</script>