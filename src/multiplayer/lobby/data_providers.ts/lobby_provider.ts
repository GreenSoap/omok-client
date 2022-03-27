import { addDoc, where, collection, type DocumentData, type DocumentReference, type Firestore, query, getDocs } from "firebase/firestore";

export default class LobbyProvider {
  private db: Firestore = null;
  constructor(_db: Firestore) {
    this.db = _db;
  }

  async find_lobby_by_code(lobby_code: string): Promise<[DocumentReference<DocumentData>, DocumentData] | null> {
    try {
      const lobbies_reference = collection(this.db, 'lobbies');
      const lobby_query = query(lobbies_reference, where('lobby_code', '==', lobby_code));
      const lobby_query_snapshot = await getDocs(lobby_query);

      if (lobby_query_snapshot.empty) {
        return null;
      }

      const lobby_document = lobby_query_snapshot.docs[0];
      return [lobby_document.ref, lobby_document.data()];
    } catch (error) {
      console.error(error);
    }
  }

  async create_lobby_listing(lobby_code: string): Promise<DocumentReference<DocumentData>> {
    try {
      const lobby_reference = await addDoc(collection(this.db, 'lobbies'), {
        lobby_code: lobby_code,
        moves: [],
      });
      return lobby_reference;
    } catch (error) {
      console.error(error);
    }
  }
}