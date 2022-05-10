import type IMove from "../move/i_move";
import type Lobby from "../lobby/base_lobby";
import BasePlayer from "./base_player"

export default class LocalPlayer extends BasePlayer {
  constructor(lobby: Lobby, player_id: number, player_name: string) {
    super(lobby, player_id, player_name);
  }

  make_move(move: IMove) {
    return this.lobby.make_move(this, move);
  }

  schedule_move() {
    // do nothing for local player
  }
}