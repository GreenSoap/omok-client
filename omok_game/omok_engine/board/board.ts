export default class Board {
  protected board: Array<Array<number>> = [];

  constructor(size: number) {
    // init bb with 0s
    for (let x = 0; x < size; x++) {
      this.board.push([]);
      for (let y = 0; y < size; y++) this.board[x].push(0);
    }
  }

  public get_piece_value(x: number, y: number) {
    return this.board[x][y];
  }

  public place_piece(x: number, y: number, piece = 1) {
    this.board[x][y] = piece;
  }

  get field() {
    return this.board;
  }
}
