import type Board from "./board";

export default class Player{

    public board: Board;
    public board_inverted: Board;

    constructor(board: Board, board_inverted: Board){
        this.board = board;
        this.board_inverted = board_inverted;
    }

    public place_piece(x: number, y: number): void{
        this.board.place_piece(x, y);
        this.board_inverted.place_piece(y, x);
    }
}