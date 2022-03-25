import type OmokGame from "src/omok_engine/game_engine";
import type IMove from "./i_move";
import type Player from "./player/player";

export default class MultiplayerMediator{
    players: Array<Player> = [];
    constructor(public game_instance: OmokGame){}

    add_player(player: Player){
        this.players.push(player);
    };

    make_move(player: Player, move: IMove){
        return this.game_instance.place_piece(move.x, move.y);
    };
}