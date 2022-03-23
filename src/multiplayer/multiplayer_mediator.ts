import type OmokGame from "src/omok_engine/game_engine";
import type IMultiplayerGameMove from "./i_multiplayer_game_move";
import type PlayerBase from "./player_base";

export default class MultiplayerMediator{
    players: Array<PlayerBase> = [];
    constructor(public game_instance: OmokGame){}

    add_player(player: PlayerBase){
        this.players.push(player);
    };

    make_move(move: IMultiplayerGameMove){
        this.game_instance.place_piece(move.x, move.y);
    };
}