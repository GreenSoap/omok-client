import { GameEngineEvent } from "../..//event/game_events";
import OmokEventManager from "../..//event/omok_event_manager";
import type BasePlayer from "../player/base_player";
import LocalPlayer from "../player/local_player";
import OnlinePlayer from "../player/online_player";
import type IMove from "./i_move";
import RandomAIPlayer from "../player/random_ai_player";

/**
 * Class that handles retrieving moves from players
 */
export default class MoveHandler {
  
 /**
  * @description Subscribes to the piece clicked event and waits for a local move to be made.
  * @returns The a move made from the piece emitted on the PIECE_CLICKED event.
  */
  private async get_local_player_move(): Promise<IMove>{
    return new Promise((resolve) => {
      const on_piece_clicked = (event: Event) => {
        OmokEventManager.instance.removeEventListener(GameEngineEvent.PIECE_CLICKED, on_piece_clicked);
        
        const {piece_x, piece_y} = (event as CustomEvent).detail;
        resolve({
          x: piece_x,
          y: piece_y
        });

        // TODO Reject when timer runs out
      };

      OmokEventManager.instance.addEventListener(GameEngineEvent.PIECE_CLICKED, on_piece_clicked);
    });
  }

  /**
   * @description Gets the move for an AI player.
   * @param player The ai player to get the move from
   * @returns The move made by the ai player
   * @todo TODO: Issue #9
   */
  private async get_ai_player_move(player: RandomAIPlayer): Promise<IMove>{
    return player.get_move();
  }

  /**
   * @deprecated Based on player instance type, retrieves a move from the player.
   * @param player The player to get the move from
   * @returns The move made by the player
   */
  public async get_move_for_player(player: BasePlayer): Promise<IMove> {
    switch(true) {
      case player instanceof LocalPlayer: 
        return this.get_local_player_move();
      case player instanceof OnlinePlayer: 
        return this.get_local_player_move();
      case player instanceof RandomAIPlayer: 
        return this.get_ai_player_move(player as RandomAIPlayer);
      default:
        return this.get_local_player_move();
    }
  }
}