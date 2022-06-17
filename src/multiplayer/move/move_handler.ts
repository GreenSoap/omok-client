import { UIEvent } from "../..//event/game_events";
import OmokEventManager from "../..//event/omok_event_manager";
import type BasePlayer from "../player/base_player";
import type IMove from "./i_move";
import type RandomAIPlayer from "../player/random_ai_player";
import type OmokGame from "src/omok_engine/game_engine";

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
        OmokEventManager.instance.removeEventListener(UIEvent.PIECE_CLICKED, on_piece_clicked);
        
        const {piece_x, piece_y} = (event as CustomEvent).detail;
        resolve({
          x: piece_x,
          y: piece_y
        });

        // TODO Reject when timer runs out
      };

      OmokEventManager.instance.addEventListener(UIEvent.PIECE_CLICKED, on_piece_clicked);
    });
  }

  /**
   * @description Gets the move for an AI player.
   * @param player The ai player to get the move from
   * @returns The move made by the ai player
   * @todo TODO: Issue #9
   */
  private async get_ai_player_move(player: RandomAIPlayer, game_instance: OmokGame): Promise<IMove>{
    return player.get_move(game_instance);
  }

  /**
   * @description Based on player instance type, retrieves a move from the player.
   * @param player The player to get the move from
   * @returns The move made by the player
   */
  public async get_move_for_player(player: BasePlayer, game_instance: OmokGame): Promise<IMove> {
    switch(player.type) {
      case 'ai': 
        return this.get_ai_player_move(player as RandomAIPlayer, game_instance);
      case 'local': 
        return this.get_local_player_move();
    }
  }
}