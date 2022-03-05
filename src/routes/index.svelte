<script lang="ts">
  import p5 from "p5";
  import { OmokPiece, OmokPieceState } from '../gui/omok_piece';
  
  enum OmokBoardState {
    EMPTY,
    PLAYER_1_VICTORY,
    PLAYER_2_VICTORY,
    DRAW
  }

  const omok_board = (p: p5) => {
    const board_side_pieces: number = 5;
    const omok_piece_size: number = 100;
    const board_state: OmokBoardState = OmokBoardState.EMPTY;

    const omok_piece_radius = new p5.Vector(omok_piece_size, omok_piece_size);
    const pieces: Array<Array<OmokPiece>> = [];
  
    let is_player_one_turn = true;

    p.setup = () => {
      p.createCanvas(700, 700);
      p.fill(234, 221, 202);
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
    }

    p.mouseClicked = (event: any) => {        
      for (let x = 0; x < board_side_pieces; x++){
        for (let y = 0; y < board_side_pieces; y++){
          if (pieces[x][y].is_within_boundary(event.x, event.y)){
            const did_place_piece = pieces[x][y].clicked(is_player_one_turn)

            if (did_place_piece){
              //Check if move led to victory



                is_player_one_turn = !is_player_one_turn;
              }

            return;
          }
        }
      }
    }
  }

  const myp5 = new p5(omok_board);

</script>