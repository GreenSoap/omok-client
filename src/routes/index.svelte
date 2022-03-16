<main></main>
<section class="debug-panel">
  <span id="mouse-pos"></span>
  <span id="current-piece"></span>
  <span id="player-turn">Player 1 Turn</span>
</section>
<style>
  span{
    display: block;
  }
</style>
<script lang="ts">
  import p5 from "p5";
  import { OmokBoard } from '../gui/omok_board';  

  const omok_board = (p: p5) => {
    const board: OmokBoard = new OmokBoard(p, 19, 37, .5, 2);

    p.setup = () => {
      p.createCanvas(700, 700);
      p.frameRate(0);
      board.draw();
    }

    p.mouseClicked = (event: any) => { 
      board.place_piece(p.mouseX, p.mouseY);
      document.getElementById("player-turn").innerText = `Player ${board.current_player+1} Turn`;
    }
    
    p.mouseMoved = (event: any) => {
      const x = Math.floor(p.mouseX / board.piece_size);
      const y = Math.floor(p.mouseY / board.piece_size);

      document.getElementById("mouse-pos").innerText = `Mouse pos: ${p.mouseX + " " + p.mouseY}`;
      document.getElementById("current-piece").innerText = `Current piece: ${x + " " + y}`;

      board.draw();
      board.highlight_piece_position(p.mouseX, p.mouseY);
    }
  }

  const myp5 = new p5(omok_board, document.getElementsByTagName("main")[0]);
  
</script>
