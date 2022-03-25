import type IMove from "../i_move";
import BasePlayer from "./base_player"

export default class LocalPlayer extends BasePlayer{
    make_move(move: IMove) {
        return this.lobby.make_move(this, move);
    }
}