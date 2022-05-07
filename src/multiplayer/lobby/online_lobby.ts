import { arrayUnion, DocumentReference, updateDoc, type DocumentData } from "firebase/firestore";
import type OmokGame from "src/omok_engine/game_engine";
import { MoveResult } from "../../omok_engine/move_status";
import FirestoreProvider from "../firestore_provider";
import type IMove from "../i_move";
import type BasePlayer from "../player/base_player";
import Lobby, { LobbyType } from "./base_lobby";
import LobbyProvider from "./data_providers/lobby_provider";

export default class OnlineLobby extends Lobby {
  private lobby_provider: LobbyProvider;
  public lobby_creator: BasePlayer | undefined;

  lobby_type = LobbyType.ONLINE;
  public lobby_code: string | undefined;
  public lobby_reference: DocumentReference<DocumentData> | undefined;

  constructor(game_instance: OmokGame) {
    super(game_instance);
    this.lobby_provider = new LobbyProvider(FirestoreProvider.get_instance().firestore);
  }

  override make_move(player: BasePlayer, move: IMove): MoveResult {
    if (this.game_instance.current_player != player.id) return MoveResult.INVALID;

    const move_result = this.game_instance.place_piece(move.x, move.y);
    updateDoc(this.lobby_reference!, {
      moves: arrayUnion({
        ...move,
        player_id: player.id
      }),
    });
    return move_result;
  }

  async connect_to_lobby(lobby_code: string) {
    try {
      const lobby = await this.lobby_provider.find_lobby_by_code(lobby_code);
      if (lobby === null) {
        throw new Error("Lobby not found");
      }
      const [lobby_reference, lobby_data] = lobby;
      this.lobby_reference = lobby_reference;
      this.dispatchEvent(new CustomEvent('lobby_connected', {
        detail: {
          lobby_data: lobby_data,
          lobby_reference: this.lobby_reference
        }
      }));

    } catch (error) {
      console.error(error);
    }
  }

  async create_lobby_listing(lobby_code: string) {
    this.lobby_reference = await this.lobby_provider.create_lobby_listing(lobby_code);
  }
}