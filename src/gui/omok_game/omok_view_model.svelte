
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
    <wired-card>
      <span>Lobby Code: <strong contenteditable="true" bind:textContent={lobby_code}></strong></span>
      <br><span>Creator: <strong contenteditable="true" bind:textContent={creator_name}></strong></span>
      <wired-button on:click={start_game_button_clicked} bind:this={start_game_button}>Start Game!</wired-button>
    </wired-card>
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
          grid-auto-rows: 0fr 1fr 0fr;
      }
  }
</style>

<script lang="ts">
  import "wired-elements";
  import { onMount } from 'svelte';
  import p5 from "p5";
  import rough from "roughjs";
  import type { RoughCanvas } from "roughjs/bin/canvas";
  import { OmokBoardView } from './omok_board';
  import OmokGame from "../../omok_engine/game_engine";
  import { MoveResult } from '../../omok_engine/move_status';
  import LobbyFactory from "../../multiplayer/lobby/lobby_factory";
  import type Lobby from "../../multiplayer/lobby/base_lobby";
  import type { LobbyType } from "../../multiplayer/lobby/base_lobby";
  import { GameEngineEvent, type GameEngineEventData } from "../../event/game_events";
  import type BasePlayer from "../../multiplayer/player/base_player";
  import ChatRoom from '../components/chat_room.svelte';
  import DebugPanel from './debug_panel.svelte'; 
import OmokEventManager from "../../event/omok_event_manager";

  // props
  export let lobby_code: string | null, 
  creator_name: string | null, 
  lobby_type: LobbyType, 
  participant_name: string | null;

  let player_turn: number, 
      piece_coord: [number, number], 
      mouse_coord: [number, number],
      victory_status: string;

  let last_piece_y: number;
  let last_piece_x: number;

  let board_gui: OmokBoardView;
  let game_instance: OmokGame;
  let lobby: Lobby;
  let player: BasePlayer;

  let p: p5;
  let rough_canvas: RoughCanvas;

  const board_size_px = 700;
  let start_game_button: HTMLElement;

  const initialize = () => {
      game_instance = new OmokGame();
      lobby = LobbyFactory.create_lobby(game_instance, lobby_type, { lobby_code: lobby_code });
      attach_local_player_turn_eventlistener(lobby);
      OmokEventManager.instance.addEventListener(GameEngineEvent.PIECE_PLACED, (e) => piece_placed(e as CustomEvent));
      OmokEventManager.instance.addEventListener(GameEngineEvent.GAME_OVER, (e) => game_over(e as CustomEvent));
  }

  const start_game_button_clicked = () => {
    // if the game is already ongoing
    if (game_instance.state.victory_status !== MoveResult.NULL) return;
    game_instance.start_game();
    start_game_button.setAttribute('disabled', '');
  }
  
  const attach_local_player_turn_eventlistener = (lobby: Lobby) => {
    lobby.addEventListener("local_player_turn", (event) => {
      player = (event as CustomEvent).detail.player;
    });
  };

  const piece_placed = (event: CustomEvent) => {
    const event_data: GameEngineEventData = event.detail;

    board_gui.place_piece(event_data.x, event_data.y, game_instance.state.current_player);
    player_turn = game_instance.state.current_player+1;
  }

  const game_over = (event: CustomEvent) => {
    victory_status = MoveResult[event.detail.victory_result];
  }

  //------ p5 functions
  
  /**
   * @todo TODO: Issue #8
   */
  const mouse_clicked = () => {
    const [piece_x, piece_y] = board_gui.get_piece_coordinate(p.mouseX, p.mouseY);
    const can_place_piece = board_gui.can_place_piece(piece_x, piece_y);
    if (!can_place_piece) return;
    OmokEventManager.instance.piece_clicked(piece_x, piece_y);
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
    console.log(lobby_code, creator_name, participant_name);

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