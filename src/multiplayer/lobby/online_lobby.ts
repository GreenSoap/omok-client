import { addDoc, arrayUnion, collection, DocumentReference, DocumentSnapshot, getDocs, query, updateDoc, where, type DocumentData } from "firebase/firestore";
import type OmokGame from "src/omok_engine/game_engine";
import { MoveResult } from "../../omok_engine/move_status";
import FirestoreProvider from "../firestore_provider";
import type IMove from "../i_move";
import type BasePlayer from "../player/base_player";
import OnlinePlayer from "../player/online_player";
import Lobby, { LobbyType } from "./base_lobby";

export default class OnlineLobby extends Lobby {
  lobby_type = LobbyType.ONLINE;
  lobby_code: string;
  lobby_reference: DocumentReference<DocumentData>;

  constructor(game_instance: OmokGame) {
    super(game_instance);
  }

  override make_move(player: BasePlayer, move: IMove): MoveResult {
    if (this.game_instance.current_player != player.id) return MoveResult.INVALID;

    console.log(`${player.id} player made move: ${move.x}, ${move.y}`);
    const move_result =  this.game_instance.place_piece(move.x, move.y);
    updateDoc(this.lobby_reference, {
      moves: arrayUnion({
        ...move,
        player_id: player.id
      }),
    });
    return move_result;
  }

  async connect_to_lobby(lobby_code: string) {
    //
    try {
      const lobbies_reference = collection(FirestoreProvider.get_instance().firestore, 'lobbies');
      const lobby_query = query(lobbies_reference, where('lobby_code', '==', lobby_code));
      const query_snapshot = await getDocs(lobby_query);
      if (query_snapshot.empty) {
        console.error(`Lobby with code ${lobby_code} not found`);
        return;
      };
      const lobby_snaptshot = query_snapshot.docs[0];
      this.lobby_reference = lobby_snaptshot.ref;
      this.dispatchEvent(new CustomEvent('lobby_connected', { detail: {
        lobby_data: lobby_snaptshot.data(),
        lobby_reference: this.lobby_reference
      } }));
      
    } catch (error) {
      console.error(error);
    }
  }

  async create_lobby_listing(lobby_code: string) {
    //
    try {
      this.lobby_reference = await addDoc(collection(FirestoreProvider.get_instance().firestore, 'lobbies'),
        {
          lobby_code: lobby_code,
          moves: [],
        }
      );
    console.log(`Lobby created with id ${this.lobby_reference.id}`);
    } catch (error) {
      console.error(error);
    }

  }
}