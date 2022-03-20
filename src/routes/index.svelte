<main>
  <section class="debug-panel">
    <span contenteditable="true" bind:textContent={mouse_coord}></span>
    <span contenteditable="true" bind:textContent={piece_coord}></span>
    <span contenteditable="true" bind:textContent={player_turn}>Player 1 Turn</span>
  </section>
</main>

<style>
  span{
    display: block;
  }
  .debug-panel{
    user-select: none;
  }
</style>
<script lang="ts">
  let mouse_coord, piece_coord, player_turn;
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
      const piece_has_been_placed = board.place_piece(p.mouseX, p.mouseY);
      if (piece_has_been_placed){
        player_turn = `Player ${board.current_player+1} Turn`;
      }
    }
    
    p.mouseMoved = (event: any) => {
      const piece_x = Math.floor(p.mouseX / board.piece_size);
      const piece_y = Math.floor(p.mouseY / board.piece_size);
      mouse_coord = `Mouse pos: ${p.mouseX + " " + p.mouseY}`;
      piece_coord = `Current piece: ${piece_x + " " + piece_y}`;

      board.draw();
      board.highlight_piece_position(p.mouseX, p.mouseY);
    }
  }

  const myp5 = new p5(omok_board, document.getElementsByTagName("main")[0]);
  
</script>
