import type BasePlayer from "../player/base_player"
import type OmokGame from "src/omok_engine/game_engine";
import type IMove from "../i_move";
import { MoveResult } from "../../omok_engine/move_status";

export enum LobbyType {
  LOCAL = 0,
  ONLINE = 1,
  AI = 2,
  SPECTATOR = 3,
}

export default abstract class Lobby extends EventTarget {
  players: Array<BasePlayer> = [];
  player_turn_events: Array<Event> = [];
  abstract lobby_type: LobbyType;
  constructor(public game_instance: OmokGame){
    super();
  }

  start() {
    const event = this.player_turn_events[this.game_instance.current_player];
    this.dispatchEvent(event);
  }

  add_player(player: BasePlayer){
    this.players.push(player);
    this.player_turn_events.push(new Event(`${player.id}_turn`));
  };

  make_move(player: BasePlayer, move: IMove): MoveResult {
    if (this.game_instance.current_player != player.id) return MoveResult.INVALID;

    console.log(`${player.id} made move: ${move.x}, ${move.y}`);
    return this.game_instance.place_piece(move.x, move.y);
  }
}

