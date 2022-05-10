import LocalPlayer from '../multiplayer/player/local_player';
import type OmokGameState from '../omok_engine/game_state';
import type { MoveResult } from '../omok_engine/move_status';
import type Player from '../omok_engine/player';
import { GameEngineEvent } from './game_events';

export default class OmokEventManager extends EventTarget {
	private static _instance: OmokEventManager | null = null;

  constructor(){
    super();
  }

	static get instance(){
		if (this._instance == null) {
			this._instance = new OmokEventManager();
		}
		return this._instance;
	}

  public piece_placed(x: number, y: number, state: OmokGameState) {
		this.dispatchEvent(
			new CustomEvent(GameEngineEvent.PIECE_PLACED, {
				detail: {
					x,
					y,
					player_id: state.current_player
				}
			})
		);
	}

	public game_over(state: OmokGameState) {
		this.dispatchEvent(
			new CustomEvent(GameEngineEvent.GAME_OVER, {
				detail: {
					player_id: state.current_player,
					victory_result: state.victory_status
				}
			})
		);
	}

	public game_start(state: OmokGameState) {
		this.dispatchEvent(
			new CustomEvent(GameEngineEvent.GAME_START, {
				detail: {
					player_amount: state.player_amount
				}
			})
		);
	}

	public new_turn(state: OmokGameState) {
		this.dispatchEvent(
			new CustomEvent(GameEngineEvent.NEW_TURN, {
				detail: state
			})
		);
	}

	public piece_clicked(piece_x: number, piece_y: number) {
		this.dispatchEvent(
			new CustomEvent(GameEngineEvent.PIECE_CLICKED, {
				detail: {
					piece_x,
					piece_y
				}
		}))
	}
}