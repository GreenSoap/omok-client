import type OmokGame from "src/omok_engine/game_engine";
import Lobby, { LobbyType } from "./base_lobby";

export default class LocalLobby extends Lobby {
	lobby_type = LobbyType.LOCAL;
	constructor(game_instance: OmokGame) {
		super(game_instance);
	}
}