import type OmokGame from "src/omok_engine/game_engine";
import Lobby from "./base_lobby";

export default class LocalLobby extends Lobby {
  constructor(game_instance: OmokGame) {
    super(game_instance);
  }
}