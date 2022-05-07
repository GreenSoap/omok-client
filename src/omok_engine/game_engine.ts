import Player from './player';
import { MoveResult } from './move_status';
import { GameEngineEvent } from './game_events';
import Board from './board/board';

export default class OmokGame extends EventTarget {
	board_size = 19;
	players: Array<Player> = [];
	current_player = 0;
	player_amount = 2;
	win_condition = 5;
	victory_status = MoveResult.NULL;
  game_board: Board;

	constructor() {
		super();
		this.initialize_game();
	}

	private initialize_game() {
    this.game_board = new Board(this.board_size);
		this.create_players();
	}

	public start_game() {
		this.dispatch_game_start_event();
		return;
	}

	private create_player() {
		const new_player = new Player(this.board_size);
		return new_player;
	}

	private create_players() {
		for (let p = 0; p < this.player_amount; p++) {
			const new_player = this.create_player();
			this.players.push(new_player);
		}
	}

	public place_piece(x: number, y: number) {
		//check if move is valid
		this.victory_status = this.is_move_valid(x, y) ? MoveResult.VALID : MoveResult.INVALID;
		if (this.victory_status === MoveResult.INVALID) return MoveResult.INVALID;

    // Place piece on game_board and player's board
		this.players[this.current_player].place_piece(x, y);
    this.game_board.place_piece(x, y, this.current_player+1); // +1 to avoid 0
		this.dispatch_piece_placed_event(x, y);

		const move_win_status = this.is_move_win(x, y);
		this.current_player = (this.current_player + 1) % this.players.length;

		if (
			move_win_status === MoveResult.WIN_DIAGONAL_LEFT ||
			move_win_status === MoveResult.WIN_DIAGONAL_RIGHT ||
			move_win_status === MoveResult.WIN_STRAIGHT
		) {
			this.dispatch_game_over_event();
		}

		this.dispatch_new_turn_event();
		return move_win_status;
	}

	private is_move_valid(x: number, y: number) {
		// Check if the position is occupied by another player's piece

		/* for (let i = 0; i < this.players.length - 1; i++) {
			const current_piece = this.players[i].board.get_piece_value(x, y);
			const next_player_piece = this.players[i + 1].board.get_piece_value(x, y);
			if (current_piece || next_player_piece) return false;
		}
		return true; */

    return this.game_board.get_piece_value(x, y) === 0;
	}

	private is_move_win(x: number, y: number) {
		// check columns
		const move_result = this.detect_victory(
			x,
			y,
			this.players[this.current_player].board.field,
			true
		);
		if (move_result !== MoveResult.VALID) {
			this.victory_status = move_result;
			return this.victory_status;
		}

		// check rows
		const move_inverted_result = this.detect_victory(
			x,
			y,
			this.players[this.current_player].board_inverted.field,
			false
		);
		if (move_inverted_result !== MoveResult.VALID) this.victory_status = move_inverted_result;

		return this.victory_status;
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

	private dispatch_piece_placed_event(x: number, y: number) {
		this.dispatchEvent(
			new CustomEvent(GameEngineEvent.PIECE_PLACED, {
				detail: {
					x,
					y,
					player_id: this.current_player
				}
			})
		);
	}

	private dispatch_game_over_event() {
		this.dispatchEvent(
			new CustomEvent(GameEngineEvent.GAME_OVER, {
				detail: {
					player_id: this.current_player,
					victory_result: this.victory_status
				}
			})
		);
	}

	private dispatch_game_start_event() {
		this.dispatchEvent(
			new CustomEvent(GameEngineEvent.GAME_START, {
				detail: {
					player_amount: this.player_amount
				}
			})
		);
	}

	private dispatch_new_turn_event() {
		this.dispatchEvent(
			new CustomEvent(GameEngineEvent.NEW_TURN, {
				detail: {
					player_id: this.current_player
				}
			})
		);
	}
}
