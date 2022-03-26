import type OmokGame from "src/omok_engine/game_engine";
import Lobby, { LobbyType } from "./base_lobby";
import LocalLobby from "./local_lobby";
import LocalPlayer from "../player/local_player";
import RandomAIPlayer from "../player/random_ai_player";
import AILobby from "./ai_lobby";
import OnlineLobby from "./online_lobby";
import OnlinePlayer from "../player/online_player";

export default class LobbyFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create_lobby(game_instance: OmokGame, lobby_type: LobbyType, options?: any): Lobby {
    let lobby: Lobby = null;
    switch (lobby_type) {
      case LobbyType.LOCAL:
        lobby = new LocalLobby(game_instance);
        lobby.add_player(new LocalPlayer(lobby, 0, "Player 1"));
        lobby.add_player(new LocalPlayer(lobby, 1, "Player 2"));
        break;
      case LobbyType.AI:
        lobby = new AILobby(game_instance);
        lobby.add_player(new LocalPlayer(lobby, 0, "Player 1"));
        lobby.add_player(new RandomAIPlayer(lobby, 1));
        break;
      case LobbyType.ONLINE_CREATE:
        lobby = new OnlineLobby(game_instance);
        (lobby as OnlineLobby).create_lobby_listing(options.lobby_code);
          lobby.add_player(new LocalPlayer(lobby, 0, "Player 1"));
          lobby.add_player(new OnlinePlayer(lobby, 1, "Player 2"));
        break;
      case LobbyType.ONLINE_JOIN:
        lobby = new OnlineLobby(game_instance);
        (lobby as OnlineLobby).connect_to_lobby(options.lobby_code);
          lobby.addEventListener('lobby_connected', () => {
            lobby.add_player(new OnlinePlayer(lobby, 0, "Player 1"));
            lobby.add_player(new LocalPlayer(lobby, 1, "Player 2"));
            game_instance.start_game();
          });
        break;
      default:
        console.error(`Lobby type ${lobby_type} not supported`);
        return;
    }

    return lobby;
  }
}