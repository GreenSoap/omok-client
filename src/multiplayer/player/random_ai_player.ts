import type IMove from "../move/i_move";
import BasePlayer from "./base_player";
import type OmokGame from "src/omok_engine/game_engine";

export default class RandomAIPlayer extends BasePlayer {
  get_move(game_instance: OmokGame): IMove {
    const available_moves = game_instance.get_available_moves();
    const random_move = available_moves[Math.floor(Math.random() * available_moves.length)];
    return {
      x: random_move.x,
      y: random_move.y
    };
  }
}