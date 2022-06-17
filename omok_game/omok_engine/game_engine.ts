import Player from './player';
import OmokEventManager from '../event/omok_event_manager';
import { MoveResult } from './move_status';
import Board from './board/board';
import OmokGameState from './game_state';

export default class OmokGame {
	board_size = 19;
	public state: OmokGameState;

	constructor() {
		const game_board = new Board(this.board_size);
		this.state = new OmokGameState(game_board);
		this.create_players();
	}

	public start_game() {
		OmokEventManager.instance.game_start(this.state);
		OmokEventManager.instance.new_turn(this.state);
		return;
	}

	private create_player() {
		const new_player = new Player(this.board_size);
		return new_player;
	}

	private create_players() {
		for (let p = 0; p < this.state.player_amount; p++) {
			const new_player = this.create_player();
			this.state.players.push(new_player);
		}
	}

	public place_piece(x: number, y: number) {
		//check if move is valid
		this.state.victory_status = this.is_move_valid(x, y) ? MoveResult.VALID : MoveResult.INVALID;
		if (this.state.victory_status === MoveResult.INVALID) 
			return MoveResult.INVALID;

    // Place piece on game_board and player's board
		this.state.players[this.state.current_player].place_piece(x, y);
    this.state.game_board.place_piece(x, y, this.state.current_player+1); // +1 to avoid 0
		OmokEventManager.instance.piece_placed(x, y, this.state);

		const move_win_status = this.is_move_win(x, y);
		this.state.current_player = (this.state.current_player + 1) % this.state.players.length;

		if (
			move_win_status === MoveResult.WIN_DIAGONAL_LEFT ||
			move_win_status === MoveResult.WIN_DIAGONAL_RIGHT ||
			move_win_status === MoveResult.WIN_STRAIGHT
		) {
			OmokEventManager.instance.game_over(this.state);
		}

		OmokEventManager.instance.new_turn(this.state);
		return move_win_status;
	}

	private is_move_valid(x: number, y: number) {
    return this.state.game_board.get_piece_value(x, y) === 0;
	}

	private is_move_win(x: number, y: number) {
		// check columns
		const move_result = this.detect_victory(
			x,
			y,
			this.state.players[this.state.current_player].board.field,
			true
		);
		if (move_result !== MoveResult.VALID) {
			this.state.victory_status = move_result;
			return this.state.victory_status;
		}

		// check rows
		const move_inverted_result = this.detect_victory(
			x,
			y,
			this.state.players[this.state.current_player].board_inverted.field,
			false
		);
		if (move_inverted_result !== MoveResult.VALID) this.state.victory_status = move_inverted_result;

		return this.state.victory_status;
	}

	private detect_victory(
		x: number,
		y: number,
		bitboard: Array<Array<number>>,
		check_diagonals = false
	) {
		let victory = false;

		// loop through x axis
		for (let i = 0; i < bitboard.length - 4; i++) {
			const col1 = parseInt(bitboard[i].join(''), 2),
				col2 = parseInt(bitboard[i + 1].join(''), 2),
				col3 = parseInt(bitboard[i + 2].join(''), 2),
				col4 = parseInt(bitboard[i + 3].join(''), 2),
				col5 = parseInt(bitboard[i + 4].join(''), 2);

			victory = (col1 & col2 & col3 & col4 & col5) != 0;

			if (victory) return MoveResult.WIN_STRAIGHT;

			if (!check_diagonals) continue;

			const col2_left_shift = col2 << 1,
				col3_left_shift = col3 << 2,
				col4_left_shift = col4 << 3,
				col5_left_shift = col5 << 4;

			victory = (col1 & col2_left_shift & col3_left_shift & col4_left_shift & col5_left_shift) != 0;
			if (victory) return MoveResult.WIN_DIAGONAL_LEFT;

			const col2_right_shift = col2 >> 1,
				col3_right_shift = col3 >> 2,
				col4_right_shift = col4 >> 3,
				col5_right_shift = col5 >> 4;

			victory =
				(col1 & col2_right_shift & col3_right_shift & col4_right_shift & col5_right_shift) != 0;
			if (victory) return MoveResult.WIN_DIAGONAL_RIGHT;
		}

		return MoveResult.VALID;
	}

	get_available_moves() {
		const moves = [];
		for (let x = 0; x < this.board_size; x++) {
			for (let y = 0; y < this.board_size; y++) {
				if (this.is_move_valid(x, y))
          moves.push({ x, y });
			}
		}
		return moves;
	}
}
