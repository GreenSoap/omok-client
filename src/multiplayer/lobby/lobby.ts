/* eslint-disable @typescript-eslint/no-unused-vars */
import { GameEngineEvent } from "../../event/game_events";
import OmokEventManager from "../../event/omok_event_manager";
import OmokGame from "../../omok_engine/game_engine";
import type OmokGameState from "../../omok_engine/game_state";
import MoveHandler from "../move/move_handler";
import BasePlayer from "../player/base_player";
import RandomAIPlayer from "../player/random_ai_player";

interface PlayerInfo {
  name: string,
  type: 'ai' | 'local'
}

interface LobbySettings {
  player_infos: Array<PlayerInfo>,
}

export default class Lobby {
  private players: Array<BasePlayer> = [];
  private move_handler = new MoveHandler();
  public readonly game_instance = new OmokGame();

  constructor(settings: LobbySettings){
    for (const playerInfo of settings.player_infos){
      this.add_player(playerInfo);
    }

    OmokEventManager.instance.addEventListener(GameEngineEvent.NEW_TURN, (e) => this.make_move_for_player((e as CustomEvent).detail));
  }

  private async make_move_for_player(state: OmokGameState) {
    const current_player = this.players[state.current_player];
    const move = await this.move_handler.get_move_for_player(current_player, this.game_instance);
    this.game_instance.place_piece(move.x, move.y);
  }

  private add_player(info: PlayerInfo){
    let player: BasePlayer;
    switch (info.type){
      case 'ai': 
        player = new RandomAIPlayer(info.name, info.type);
        break;
      case 'local': 
        player = new BasePlayer(info.name, info.type);
        break;
    }

    this.players.push(player);
  }
}