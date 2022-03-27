import Board from "./board";

export default class BitBoard extends Board {
	constructor(size: number) {
		super(size);
	}

	override place_piece(x: number, y: number) {
		this.board[x][y] = 1;
	}
}