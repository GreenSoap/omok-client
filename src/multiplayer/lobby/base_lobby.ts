import type BasePlayer from "../player/base_player"
import type OmokGame from "src/omok_engine/game_engine";
import type IMove from "../i_move";
import type { MoveResult } from "src/omok_engine/move_status";

export enum LobbyType {
  LOCAL = 0,
  ONLINE = 1,
  AI = 2,
  SPECTATOR = 3,
}

export default abstract class Lobby {
  players: Array<BasePlayer> = [];
  abstract lobby_type: LobbyType;
  constructor(public game_instance: OmokGame){}

  add_player(player: BasePlayer){
    this.players.push(player);
  };

  make_move(player: BasePlayer, move: IMove): MoveResult {
    return this.game_instance.place_piece(move.x, move.y);
  }
}