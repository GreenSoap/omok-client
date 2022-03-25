import type OmokGame from "src/omok_engine/game_engine";
import type IMove from "./i_move";
import type MultiplayerPlayer from "./player/multiplayer_player";

export default class MultiplayerLobby{
    players: Array<MultiplayerPlayer> = [];
    constructor(public game_instance: OmokGame){}

    add_player(player: MultiplayerPlayer){
        this.players.push(player);
    };

    make_move(player: MultiplayerPlayer, move: IMove){
        return this.game_instance.place_piece(move.x, move.y);
    };
}