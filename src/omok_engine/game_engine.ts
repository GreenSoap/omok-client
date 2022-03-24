import Player from './player';
import Board from './board';
import { MoveResult } from './move_status';

export default class OmokGame{

    players: Array<Player> = [];
    current_player = 0;
    player_amount = 2;
    win_condition = 5;

    constructor(){
        this.initialize_game();
    }

    private initialize_game(){
        this.create_players();
    }

    public start_game(){
        
    }

    private create_player(){
        const board = new Board(19);
        const board_inverted = new Board(19);
        const new_player = new Player(board, board_inverted);

        return new_player;
    }

    private create_players(){
        for (let p = 0; p < this.player_amount; p++){
            const new_player = this.create_player();
            this.players.push(new_player);
        }
    }

    public place_piece(x: number, y: number){
        //check if move is valid
        const is_move_valid = this.is_move_valid(x, y);
        if (!is_move_valid) return MoveResult.INVALID;

        console.log(x, y);
        this.players[this.current_player].place_piece(x, y);
        
        const move_win_status = this.is_move_win(x, y);
        console.log('Victory status', this.current_player, move_win_status.valueOf());
        this.current_player = (this.current_player+1) % this.players.length;

        
        return move_win_status;
    }

    private is_move_valid(x: number, y: number){
        // Check if the position is occupied by another player's piece
        for (let i = 0; i < this.players.length-1; i++){
            const current_piece = this.players[i].board.get_piece_value(x, y);
            const next_player_piece = this.players[i+1].board.get_piece_value(x, y);
            if (current_piece || next_player_piece)
                return false;          
        }
        return true;
    }

    private is_move_win(x: number, y: number){
        const player_bitboard = this.players[this.current_player].board.field;
        const player_bitboard_inverted = this.players[this.current_player].board_inverted.field;
        let is_move_win = false;
        is_move_win = this.detect_horizontal_victory(x, y, player_bitboard);
        if (is_move_win) return MoveResult.WIN_HORIZONTAL;
        is_move_win = this.detect_horizontal_victory(x, y, player_bitboard_inverted);
        if (is_move_win) return MoveResult.WIN_VERTICAL;

        return is_move_win;
    }

    private detect_horizontal_victory(x: number, y: number, bitboard: Array<Array<number>>){
        let victory = false;

        // loop through x axis
        for (let i = 0; i < bitboard.length-2; i++){
            const col1 = (bitboard[i].join("") as unknown as number),
                  col2 = (bitboard[i+1].join("") as unknown as number),
                  col3 = (bitboard[i+2].join("") as unknown as number);

            console.log(i, bitboard[i].join(""));
            
            victory = ((col1 & col2 & col3) != 0);

            if (victory) break;
        }

        return victory;
    }
}