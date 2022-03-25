import type MultiplayerPlayer from "../player/multiplayer_player";
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
  players: Array<MultiplayerPlayer> = [];
  abstract lobby_type: LobbyType;
  constructor(public game_instance: OmokGame){}

  add_player(player: MultiplayerPlayer){
    this.players.push(player);
  };

  make_move(player: MultiplayerPlayer, move: IMove): MoveResult {
    return this.game_instance.place_piece(move.x, move.y);
  }
}