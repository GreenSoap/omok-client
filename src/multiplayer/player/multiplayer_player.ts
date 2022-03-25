import type MultiplayerLobby from "src/multiplayer/multiplayer_lobby";
import type { MoveResult } from "src/omok_engine/move_status";
import type IMove from "../i_move";

export default abstract class MultiplayerPlayer {
    constructor(protected lobby: MultiplayerLobby){
        
    }

    abstract make_move(move: IMove): MoveResult;
}