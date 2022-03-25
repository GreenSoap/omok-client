import type { MoveResult } from "src/omok_engine/move_status";
import type IMove from "../i_move";
import type Lobby from "../lobby/base_lobby";
import BasePlayer from "./base_player";

export default class RandomAIPlayer extends BasePlayer {
  constructor(lobby: Lobby, player_id: number) {
    super(lobby, player_id);
  }

  make_move(move: IMove): MoveResult {
      return this.lobby.make_move(this, move);
  }

  schedule_move(): void {
    const game_instance = this.lobby.game_instance;
    const available_moves = game_instance.get_available_moves();
    const random_move = available_moves[Math.floor(Math.random() * available_moves.length)];
    this.make_move({
      x: random_move.x,
      y: random_move.y
    });
  }
}