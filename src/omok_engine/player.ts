import Board from "./board";

export default class Player{
    public board: Board;
    public board_inverted: Board;

    constructor(board_size: number){
        this.board = new Board(board_size);
        this.board_inverted = new Board(board_size);
    }

    public place_piece(x: number, y: number): void{
        this.board.place_piece(x, y);
        this.board_inverted.place_piece(y, x);
    }
}