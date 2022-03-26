import BitBoard from './board/bit_board';

export default class Player {
	public board: BitBoard;
	public board_inverted: BitBoard;

	constructor(board_size: number) {
		this.board = new BitBoard(board_size);
		this.board_inverted = new BitBoard(board_size);
	}

	public place_piece(x: number, y: number): void {
		this.board.place_piece(x, y);
		this.board_inverted.place_piece(y, x);
	}
}
