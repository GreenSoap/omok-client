import type { MoveResult } from "src/omok_engine/move_status";
import type IMove from "../i_move";
import type Lobby from "../lobby/base_lobby";
import BasePlayer from "./base_player";

export default class RandomAIPlayer extends BasePlayer {
  constructor(lobby: Lobby) {
    super(lobby);
  }

  make_move(move: IMove): MoveResult {
      return this.lobby.make_move(this, move);
  }

  request_move(): void {
    const game_instance = this.lobby.game_instance;
    const move: IMove = {
      x: Math.floor(Math.random() * game_instance.board_size),
      y: Math.floor(Math.random() * game_instance.board_size),
    };
    this.make_move(move);
  }
}