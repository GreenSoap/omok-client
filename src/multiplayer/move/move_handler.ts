import { onSnapshot } from "firebase/firestore";
import { MoveResult } from "../../omok_engine/move_status";
import { GameEngineEvent } from "../..//event/game_events";
import OmokEventManager from "../..//event/omok_event_manager";
import type BasePlayer from "../player/base_player";
import LocalPlayer from "../player/local_player";
import OnlinePlayer from "../player/online_player";
import type IMove from "./i_move";
import RandomAIPlayer from "../player/random_ai_player";


export default class MoveHandler {
  
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

  private async get_ai_player_move(player: RandomAIPlayer): Promise<IMove>{
    return player.get_move();
  }

  public async get_move_for_player(player: BasePlayer): Promise<IMove> {
    switch(true) {
      case player instanceof LocalPlayer: 
        console.log(player);
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