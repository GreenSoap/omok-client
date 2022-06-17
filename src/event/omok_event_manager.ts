import type OmokGameState from '../omok_engine/game_state';
import { GameEngineEvent, UIEvent } from './game_events';

/**
 * Global event manager
 */
export default class OmokEventManager extends EventTarget {
  /**
   * Current singleton instance
   */
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

// ---------------------------------------------------------------------------------------
// ------------------------------ Global Events ------------------------------------------
// ---------------------------------------------------------------------------------------

  /**
   * @description Dispatches a {@link UIEvent.PIECE_CLICKED} event.
   * @param piece_x x-coordinate of the piece
   * @param piece_y y-coordinate of the piece
   */
	public piece_clicked(piece_x: number, piece_y: number) {
    const event_data = { piece_x, piece_y };
    const event = new CustomEvent(UIEvent.PIECE_CLICKED, { detail: event_data });
		this.dispatchEvent(event);
	}

// ---------------------------------------------------------------------------------------
// --------------------------------- Game Egnine Events ----------------------------------
// ---------------------------------------------------------------------------------------

  /**
   * @description Dispatches a {@link GameEngineEvent.PIECE_PLACED} event.
   * @param x x-coordinate of the piece placed
   * @param y y-coordinate of the piece placed
   * @param state The current game {@link OmokGameState}
   */
  public piece_placed(x: number, y: number, state: OmokGameState) {
    const event_data = { x, y, player_id: state.current_player };
    const event = new CustomEvent(GameEngineEvent.PIECE_PLACED, { detail: event_data });
    this.dispatchEvent(event);
  }

  /**
   * @description Dispatches a {@link GameEngineEvent.GAME_OVER} event.
   * @param state The current game {@link OmokGameState}
   */
  public game_over(state: OmokGameState) {
    const event_data = {
      player_id: state.current_player,
      victory_result: state.victory_status
    };
    const event = new CustomEvent(GameEngineEvent.GAME_OVER, { detail: event_data });
    this.dispatchEvent(event);
  }

  /**
   * @description Dispatches a {@link GameEngineEvent.GAME_START} event.
   * @param state The current game {@link OmokGameState}
   */
  public game_start(state: OmokGameState) {
    const event_data = { player_amount: state.player_amount };
    const event = new CustomEvent(GameEngineEvent.GAME_START, { detail: event_data });
    this.dispatchEvent(event);
  }

  /**
   * @description Dispatches a {@link GameEngineEvent.NEW_TURN} event.
   * @param state The current game {@link OmokGameState}
   */
  public new_turn(state: OmokGameState) {
    const event_data = state;
    const event = new CustomEvent(GameEngineEvent.NEW_TURN, { detail: event_data });
    this.dispatchEvent(event);
  }
}