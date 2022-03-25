import type IMultiplayerGameMove from "../i_move";
import PlayerBase from "./player_base";

export default class PlayerLocal extends PlayerBase{
    make_move(move: Omit<IMultiplayerGameMove, 'player'>) {
        return this.mediator.make_move(this, move);
    }
}