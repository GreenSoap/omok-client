import type { MoveResult } from "../../omok_engine/move_status";
import type IMove from "../move/i_move";
import type Lobby from "../lobby/base_lobby";

export default abstract class BasePlayer {
  constructor(
    protected lobby: Lobby,
    protected player_id: number,
    protected player_name: string,
  ) { }

  get id() { return this.player_id; }
  get name() { return this.player_name; }

  abstract make_move(move: IMove): MoveResult;
  abstract schedule_move();
}