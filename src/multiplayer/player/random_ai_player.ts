import type { MoveResult } from "../../omok_engine/move_status";
import type IMove from "../move/i_move";
import type Lobby from "../lobby/base_lobby";
import BasePlayer from "./base_player";

export default class RandomAIPlayer extends BasePlayer {
  constructor(lobby: Lobby, player_id: number) {
    super(lobby, player_id, "Random AI");
  }

  /**
   * @deprecated deprecated
   */
  make_move(move: IMove): MoveResult {
    return this.lobby.make_move(this, move);
  }
  /**
   * @deprecated deprecated
   */
  schedule_move(): void {
    const game_instance = this.lobby.game_instance;
    const available_moves = game_instance.get_available_moves();
    const random_move = available_moves[Math.floor(Math.random() * available_moves.length)];
    this.make_move({
      x: random_move.x,
      y: random_move.y
    });
  }

  get_move(): IMove {
    const game_instance = this.lobby.game_instance;
    const available_moves = game_instance.get_available_moves();
    const random_move = available_moves[Math.floor(Math.random() * available_moves.length)];
    return {
      x: random_move.x,
      y: random_move.y
    };
  }
}