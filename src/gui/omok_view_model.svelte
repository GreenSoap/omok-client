
<section id="omok-game"></section>

<DebugPanel 
    mouse_coord={mouse_coord} 
    player_turn={player_turn}
    piece_coord={piece_coord}
    victory_status={victory_status}>
</DebugPanel>
<script lang="ts">
    import p5 from "p5";
    import { OmokBoardView } from './omok_board'; 
    import DebugPanel from './debug_panel.svelte'; 
    import PlayerLocal from "../multiplayer/player_local";
    //import PlayerOnline from "../multiplayer/player_online";
    import OmokGame from "../omok_engine/game_engine";
    import MultiplayerMediator from "../multiplayer/multiplayer_mediator";
    import type { MoveResult } from 'src/omok_engine/move_status';
    import { onMount } from "svelte";
    let player_turn: number, 
        piece_coord: string, 
        mouse_coord: string,
        victory_status: MoveResult;

    onMount(() => {
        const game_instance = new OmokGame();
        const mediator = new MultiplayerMediator(game_instance);

        mediator.add_player(new PlayerLocal(mediator));
        mediator.add_player(new PlayerLocal(mediator));


        const omok_board = (p: p5) => {
            const board_size_px = 700;

            const board_gui: OmokBoardView = new OmokBoardView(p, 19, 37, .5, 2, board_size_px, "/edward-cullen.jpg");

            p.preload = () => {
                board_gui.preload();
            }

            p.setup = () => {
                const canvas = p.createCanvas(board_size_px, board_size_px);
                canvas.parent("omok-game");
                p.frameRate(0);
                board_gui.draw();

                player_turn = game_instance.current_player+1;
            }

            p.mouseClicked = () => { 
                const [piece_x, piece_y] = board_gui.get_piece_coordinate(p.mouseX, p.mouseY);

                const piece_has_been_placed = board_gui.place_piece(piece_x, piece_y, game_instance.current_player);

                if (piece_has_been_placed){
                    const move_result = mediator.players[game_instance.current_player].make_move({
                        x: piece_x,
                        y: piece_y
                    });

                    victory_status = move_result;

                    player_turn = game_instance.current_player+1;
                }
            }
            
            p.mouseMoved = () => {
                const [piece_x, piece_y] = board_gui.get_piece_coordinate(p.mouseX, p.mouseY);

                // If mouse is OOB, do not update with current mouse coords
                if (piece_x >= board_gui.size || piece_y >= board_gui.size || piece_x < 0 || piece_y < 0){
                    piece_coord = "";
                    mouse_coord = "";
                    return;
                }
            
                mouse_coord = p.mouseX + " " + p.mouseY;
                piece_coord = piece_x + " " + piece_y;

                board_gui.draw();
                board_gui.highlight_piece_position(p.mouseX, p.mouseY);
            }
        }

        const myp5 = new p5(omok_board);
    });
</script>