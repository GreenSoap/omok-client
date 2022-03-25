import type IMove from "../i_move";
import type Lobby from "../lobby/base_lobby";
import BasePlayer from "./base_player"

export default class LocalPlayer extends BasePlayer{
  constructor(lobby: Lobby, player_id: number) {
    super(lobby, player_id);
  }

  make_move(move: IMove) {
      return this.lobby.make_move(this, move);
  }
}