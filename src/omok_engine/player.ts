import type Board from "./board";

export default class Player{

    public board: Board;

    constructor(board: Board){
        this.board = board;
    }

    public place_piece(x: number, y: number): void{
        this.board.place_piece(x, y);
    }
}