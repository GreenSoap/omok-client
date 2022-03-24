import { MoveResult } from "src/omok_engine/move_status";
import type i_multiplayer_game_move from "./i_multiplayer_game_move";
import PlayerBase from "./player_base";

export default class PlayerOnline extends PlayerBase{
    make_move(move: Omit<i_multiplayer_game_move, "player">) {
        throw new Error("Method not implemented.");
        return MoveResult.NULL;
    }
}