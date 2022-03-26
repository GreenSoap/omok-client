
<section class="omok-game-instance">
  <wired-card elevation="1" id="omok-game"></wired-card>
  <div class="game-side-panel">
    <DebugPanel 
      mouse_coord={mouse_coord} 
      player_turn={player_turn}
      piece_coord={piece_coord}
      victory_status={victory_status}>
    </DebugPanel>
    <ChatRoom></ChatRoom>
  </div>
</section>
  
<style lang="scss">
  .omok-game-instance{
      display: grid;
      grid-auto-columns: 0fr 1fr;
      grid-auto-rows: 0fr 1fr;

      .game-side-panel{
          grid-row: 1;
          grid-column: 2; 
          display: grid;
          grid-auto-rows: 0fr 1fr;
      }
  }
</style>

<script lang="ts">
  import "wired-elements";
  import { onMount } from 'svelte';
  import p5 from "p5";
  import rough from "roughjs";
  import { OmokBoardView } from './omok_board';
  import ChatRoom from './components/chat_room.svelte';

  import DebugPanel from './debug_panel.svelte'; 
  import OmokGame from "../omok_engine/game_engine";
  import { MoveResult } from '../omok_engine/move_status';
  import LobbyFactory from "../multiplayer/lobby/lobby_factory";
  import Lobby, { LobbyType } from "../multiplayer/lobby/base_lobby";
  import { GameEngineEvent, type GameEngineEventData } from "../omok_engine/game_events";
  import type { RoughCanvas } from "roughjs/bin/canvas";

  let player_turn: number, 
      piece_coord: [number, number], 
      mouse_coord: [number, number],
      victory_status: string;

  let last_piece_y: number;
  let last_piece_x: number;



  let board_gui: OmokBoardView;
  let game_instance: OmokGame;
  let lobby: Lobby;

  let p: p5;
  let rough_canvas: RoughCanvas;

  const board_size_px = 700;

  const initialize = () => {
      game_instance = new OmokGame();
      lobby = LobbyFactory.create_lobby(game_instance, LobbyType.AI);
      game_instance.addEventListener(GameEngineEvent.PIECE_PLACED, piece_placed);
      game_instance.addEventListener(GameEngineEvent.GAME_OVER, game_over);
      lobby.start();
  }

  const piece_placed = (event: CustomEvent) => {
      const event_data: GameEngineEventData = event.detail;

      board_gui.place_piece(event_data.x, event_data.y, game_instance.current_player);
      player_turn = game_instance.current_player+1;
  }

  const game_over = (event: CustomEvent) => {
      victory_status = MoveResult[event.detail.victory_result];
  }

  // p5 functions
  const mouse_clicked = () => {
    const [piece_x, piece_y] = board_gui.get_piece_coordinate(p.mouseX, p.mouseY);
      const can_place_piece = board_gui.can_place_piece(piece_x, piece_y);
      if (!can_place_piece) return;

      lobby.players[game_instance.current_player].make_move({
        x: piece_x,
        y: piece_y
      });
  };

  const preload = () => {
    board_gui.preload();
  }

  const setup = () => {
    const canvas = p.createCanvas(board_size_px, board_size_px);
    canvas.parent("omok-game");
    p.frameRate(0);
    rough_canvas = rough.canvas(document.getElementById("defaultCanvas0") as HTMLCanvasElement);
    board_gui.rough_canvas = rough_canvas;
    board_gui.draw();
  }

  const mouseMoved = () => {
    const [piece_x, piece_y] = board_gui.get_piece_coordinate(p.mouseX, p.mouseY);
    
    if (last_piece_y == piece_y && last_piece_x == piece_x) 
      return; 

    // If mouse is OOB, do not update with current mouse coords
    if (piece_x >= board_gui.size || piece_y >= board_gui.size || piece_x < 0 || piece_y < 0){
      piece_coord = [NaN, NaN];
      mouse_coord = [NaN, NaN];
      return;
    }

    mouse_coord = [Math.round(p.mouseX), Math.round(p.mouseY)];
    piece_coord = [piece_x, piece_y];

    board_gui.draw();
    board_gui.highlight_piece_position(p.mouseX, p.mouseY);

    last_piece_y = piece_y;
    last_piece_x = piece_x;
  }

  onMount(() => {
    initialize();

    const omok_board = (_p: p5) => {
      p = _p;
      p.preload = preload;
      p.setup = setup;
      p.mouseClicked = mouse_clicked;
      p.mouseMoved = mouseMoved;
      board_gui = new OmokBoardView(p, 19, 37, .5, 2, board_size_px, "/edward-cullen.jpg");
    }

    const _ = new p5(omok_board);
  });
</script>