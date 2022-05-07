import type BasePlayer from "../player/base_player"
import type OmokGame from "src/omok_engine/game_engine";
import type IMove from "../i_move";
import { MoveResult } from "../../omok_engine/move_status";
import { GameEngineEvent } from "../../omok_engine/game_events";
import LocalPlayer from "../player/local_player";

export enum LobbyType {
  LOCAL = 0,
  ONLINE = 1,
  AI = 2,
  SPECTATOR = 3,
  ONLINE_CREATE = 4,
  ONLINE_JOIN = 5,
}

export default abstract class Lobby extends EventTarget {
  players: Array<BasePlayer> = [];
  player_turn_events: Array<Event> = [];
  abstract lobby_type: LobbyType;
  constructor(public game_instance: OmokGame) {
    super();
    game_instance.addEventListener(GameEngineEvent.GAME_START, () => this.start());
    game_instance.addEventListener(GameEngineEvent.NEW_TURN, () => this.request_next_move());
  }

  start() {
    this.request_next_move();
  }

  add_player(player: BasePlayer) {
    this.players.push(player);

    // Create and attach turn event listeners
    const event_type_name = `${player.id}_turn`;
    this.player_turn_events.push(new Event(event_type_name));
    this.addEventListener(event_type_name, () => player.schedule_move());
  };

  make_move(player: BasePlayer, move: IMove): MoveResult {
    if (this.game_instance.current_player != player.id) {
      return MoveResult.INVALID
    };

    const move_result = this.game_instance.place_piece(move.x, move.y);

    return move_result;
  }

  private request_next_move() {
    const next_player = this.players[this.game_instance.current_player];
    this.dispatchEvent(this.player_turn_events[this.game_instance.current_player]);
    if (next_player instanceof LocalPlayer) {
      this.dispatchEvent(new CustomEvent('local_player_turn', {
        detail: {
          player: next_player,
        }
      }));
    }
  }
}

