import type OmokGame from "src/omok_engine/game_engine";
import type Lobby from "./lobby/base_lobby";
import LocalLobby from "./lobby/local_lobby";
import LocalPlayer from "./player/local_player";

enum LobbyType {
  LOCAL = 0,
  ONLINE = 1,
  AI = 2,
  SPECTATOR = 3,
}

export default class LobbyFactory {
  static create_lobby(game_instance: OmokGame, lobby_type: LobbyType): Lobby {
    let lobby: Lobby = null;
    switch (lobby_type) {
      case LobbyType.LOCAL:
        lobby = new LocalLobby(game_instance);
        lobby.add_player(new LocalPlayer(lobby));
        lobby.add_player(new LocalPlayer(lobby));
        break;
      default:
        console.error(`Lobby type ${lobby_type} not supported`);
        return;
    }

    return lobby;
  }
}