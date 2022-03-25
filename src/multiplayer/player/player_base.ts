import type IMultiplayerMediator from "src/multiplayer/multiplayer_mediator";
import type { MoveResult } from "src/omok_engine/move_status";
import type IMove from "../i_move";

export default abstract class PlayerBase{
    constructor(protected mediator: IMultiplayerMediator){
        
    }

    abstract make_move(move: IMove): MoveResult;
}