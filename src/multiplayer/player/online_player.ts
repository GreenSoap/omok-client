import { onSnapshot } from "firebase/firestore";
import { MoveResult } from "../../omok_engine/move_status";
import type IMove from "../i_move";
import type Lobby from "../lobby/base_lobby";
import type OnlineLobby from "../lobby/online_lobby";
import BasePlayer from "./base_player";

export default class OnlinePlayer extends BasePlayer {
  constructor(lobby: Lobby, player_id: number, player_name: string) {
    super(lobby, player_id, player_name);
  }

  make_move(move: IMove): MoveResult {
    return this.lobby.make_move(this, move);
  }

  schedule_move() {
    const unsubscribe = onSnapshot((this.lobby as OnlineLobby).lobby_reference, (lobby_document) => {
      const move = lobby_document.data().moves[lobby_document.data().moves.length - 1];
      if (this.id === move.player_id) {
        const move_result = this.make_move(move);
        if (move_result !== MoveResult.INVALID)
          unsubscribe();
      }
    });
  }
}