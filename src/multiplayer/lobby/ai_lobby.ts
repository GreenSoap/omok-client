import type OmokGame from "src/omok_engine/game_engine";
import Lobby, { LobbyType } from "./base_lobby";

export default class AILobby extends Lobby {
  lobby_type = LobbyType.AI;
  constructor(game_instance: OmokGame) {
    super(game_instance);
  }
}