import type { MoveResult } from "src/omok_engine/move_status";
import type IMove from "../i_move";
import type Lobby from "../lobby/base_lobby";

export default abstract class BasePlayer {
    constructor(protected lobby: Lobby){
        
    }

    abstract make_move(move: IMove): MoveResult;
}