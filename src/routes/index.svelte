<h1>omok.io</h1>

<canvas id="omok-game"></canvas>

<script lang="ts">
  import p5 from "p5";

  class OmokBoard {
    size: number;
    pieces: Array<Array<OmokPiece>> = new Array<Array<OmokPiece>>();
    p: p5
    constructor(p: p5){
      this.p = p;  
    }

    draw(){
      for (let x = 0; x < this.size; x++){
        for (let y = 0; y < this.size; y++){
          this.pieces[x][y] = new OmokPiece(this.p, x * 25, y * 25, 25);          
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

    draw(x: number, y: number, size: number){
      this.p.stroke(255);
      this.p.rect(x, y, size, size);

      this.p.stroke(0);
      this.p.line(x+size/2, y, x+size/2, y+size);

      this.p.stroke(0);
      this.p.line(x, y+size/2, x+size, y+size/2);
    }
  }
  /*
  const create_piece = function(p:p5, x: number, y: number, size: number){
    p.stroke(255);
    p.rect(x, y, size, size);

    p.stroke(0);
    p.line(x+size/2, y, x+size/2, y+size);

    p.stroke(0);
    p.line(x, y+size/2, x+size, y+size/2);
  }

  const omok_board = function(p: p5) {
    p.setup = function() {
      p.noStroke();
      p.noSmooth();
      p.createCanvas(700, 410);
    };

    p.draw = function() {      
      const board_size = 19;
      for (let x_pieces_count = 0; x_pieces_count < board_size; x_pieces_count++){
        for (let y_pieces_count = 0; y_pieces_count < board_size; y_pieces_count++){
          
          console.log(x_pieces_count * board_size, y_pieces_count * board_size);
          create_piece(p, 
                      x_pieces_count * board_size, 
                      y_pieces_count * board_size, 
                      board_size);
        }
      }

      
    };
  };*/
  const omok_game = function(p:p5){
      p.setup = function(){
        p.noStroke();
        p.noSmooth();
        p.createCanvas(700, 410);
      }
      
      p.draw = function(){
        //const OmokBoard = new OmokBoard()
      }
    }
  const myp5 = new p5(omok_game);

</script>