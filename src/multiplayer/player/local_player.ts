import type IMove from "../i_move";
import MultiplayerPlayer from "./multiplayer_player";

export default class LocalPlayer extends MultiplayerPlayer{
    make_move(move: IMove) {
        return this.lobby.make_move(this, move);
    }
}