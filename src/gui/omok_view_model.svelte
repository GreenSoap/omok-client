
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
    import { LobbyType } from "../multiplayer/lobby/base_lobby";

    let player_turn: number, 
        piece_coord: string, 
        mouse_coord: string,
        victory_status: string;

    let last_piece_y: number;
    let last_piece_x: number;

    onMount(() => {
        const game_instance = new OmokGame();
        const lobby = LobbyFactory.create_lobby(game_instance, LobbyType.LOCAL);
        lobby.start();
        
        const omok_board = (p: p5) => {
            const board_size_px = 700;
            const board_gui: OmokBoardView = new OmokBoardView(p, 19, 37, .5, 2, board_size_px, "/edward-cullen.jpg");

            let rough_canvas;

            p.preload = () => {
                board_gui.preload();
            }

            p.setup = () => {
                const canvas = p.createCanvas(board_size_px, board_size_px);
                canvas.parent("omok-game");
                p.frameRate(0);
                rough_canvas = rough.canvas(document.getElementById("defaultCanvas0") as HTMLCanvasElement);
                board_gui.rough_canvas = rough_canvas;
                player_turn = game_instance.current_player+1;

                board_gui.draw();

            }

            p.mouseClicked = () => { 
                const [piece_x, piece_y] = board_gui.get_piece_coordinate(p.mouseX, p.mouseY);

                const piece_has_been_placed = board_gui.place_piece(piece_x, piece_y, game_instance.current_player);

                if (piece_has_been_placed){
                    const move_result = lobby.players[game_instance.current_player].make_move({
                        x: piece_x,
                        y: piece_y
                    });

                    victory_status = MoveResult[move_result];

                    player_turn = game_instance.current_player+1;
                }
            }
            
            p.mouseMoved = () => {
                const [piece_x, piece_y] = board_gui.get_piece_coordinate(p.mouseX, p.mouseY);
                
                if (last_piece_y == piece_y && last_piece_x == piece_x) 
                    return; 

                // If mouse is OOB, do not update with current mouse coords
                if (piece_x >= board_gui.size || piece_y >= board_gui.size || piece_x < 0 || piece_y < 0){
                    piece_coord = "";
                    mouse_coord = "";
                    return;
                }
            
                mouse_coord = "[" + Math.round(p.mouseX) + ", " + Math.round(p.mouseY) + "]";
                piece_coord = "[" + piece_x + ", " + piece_y + "]";

                board_gui.draw();
                board_gui.highlight_piece_position(p.mouseX, p.mouseY);

                last_piece_y = piece_y;
                last_piece_x = piece_x;
            }
        }

        const myp5 = new p5(omok_board);
    });
</script>