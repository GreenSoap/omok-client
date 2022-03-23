import type IMultiplayerMediator from "src/multiplayer/multiplayer_mediator";
import type IMultiplayerGameMove from "./i_multiplayer_game_move";

export default abstract class PlayerBase{
    constructor(protected mediator: IMultiplayerMediator){
        
    }

    abstract make_move(move: Omit<IMultiplayerGameMove, 'player'>);
}