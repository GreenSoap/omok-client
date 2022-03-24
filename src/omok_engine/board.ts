export default class Board{
    private bitboard: Array<Array<number>> = [];

    constructor(size: number){
        // init bb with 0s
        for (let x = 0; x < size; x++) {
            this.bitboard.push([]);
            for (let y = 0; y < size; y++)
                this.bitboard[x].push(0);
        }
    }

    public get_piece_value(x: number, y: number){
        return this.bitboard[x][y];
    }

    public place_piece(x: number, y: number){
        this.bitboard[x][y] = 1;
    }

    get field(){
        return this.bitboard;
    }
}