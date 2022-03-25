import type OmokGame from "src/omok_engine/game_engine";
import Lobby, { LobbyType } from "./base_lobby";
import LocalLobby from "./local_lobby";
import LocalPlayer from "../player/local_player";

export default class LobbyFactory {
  static create_lobby(game_instance: OmokGame, lobby_type: LobbyType): Lobby {
    let lobby: Lobby = null;
    switch (lobby_type) {
      case LobbyType.LOCAL:
        lobby = new LocalLobby(game_instance);
        lobby.add_player(new LocalPlayer(lobby, 0));
        lobby.add_player(new LocalPlayer(lobby, 1));
        break;
      default:
        console.error(`Lobby type ${lobby_type} not supported`);
        return;
    }

    return lobby;
  }
}