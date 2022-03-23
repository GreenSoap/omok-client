import type IMultiplayerGameMove from "./i_multiplayer_game_move";
import PlayerBase from "./player_base";

export default class PlayerLocal extends PlayerBase{
    make_move(move: Omit<IMultiplayerGameMove, 'player'>) {
        this.mediator.make_move({
            ...move, 
            player: this
        });
    }
}