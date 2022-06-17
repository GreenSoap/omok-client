import type Player from './player';
import { MoveResult } from './move_status';
import type Board from './board/board';

export default class OmokGameState {
	public players: Array<Player> = [];
	public victory_status = MoveResult.NULL;

	constructor(
		public game_board: Board,
		public current_player = 0,
		public player_amount = 2,
		public win_condition = 5){}
}