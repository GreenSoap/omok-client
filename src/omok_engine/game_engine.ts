import Player from './player';
import { MoveResult } from './move_status';

export default class OmokGame{

    players: Array<Player> = [];
    current_player = 0;
    player_amount = 2;
    win_condition = 5;
    victory_status = MoveResult.NULL;

    constructor(){
        this.initialize_game();
    }

    private initialize_game(){
        this.create_players();
    }

    public start_game(){
        return;
    }

    private create_player(){
        const new_player = new Player(19);
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

        this.players[this.current_player].place_piece(x, y);
        
        const move_win_status = this.is_move_win(x, y);
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
        // check columns
        const move_result = this.detect_victory(x, y, this.players[this.current_player].board.field, true);        
        if (move_result != MoveResult.NULL){
            this.victory_status = move_result;
            return this.victory_status;
        }

        // check rows
        const move_inverted_result = this.detect_victory(x, y, this.players[this.current_player].board_inverted.field);
        if (move_inverted_result != MoveResult.NULL)
            this.victory_status = move_inverted_result;
        
        return this.victory_status;
    }

    private detect_victory(x: number, y: number, bitboard: Array<Array<number>>, check_diagonals = false){
        let victory = false;

        // loop through x axis
        for (let i = 0; i < bitboard.length-2; i++){
            const col1 = parseInt(bitboard[i].join(""), 2),
                  col2 = parseInt(bitboard[i+1].join(""), 2),
                  col3 = parseInt(bitboard[i+2].join(""), 2);

            victory = ((col1 & col2 & col3) != 0);

            if (victory) 
                return MoveResult.WIN_STRAIGHT;

            if (!check_diagonals) 
                continue;

            const col2_left_shift = col2 << 1,
                  col3_left_shift = col3 << 2;

            victory = ((col1 & col2_left_shift & col3_left_shift) != 0);
            if (victory) 
                return MoveResult.WIN_DIAGONAL_LEFT;

            const col2_right_shift = col2 >> 1,
                  col3_right_shift = col3 >> 2;

            victory = ((col1 & col2_right_shift & col3_right_shift) != 0);
            if (victory) 
                return MoveResult.WIN_DIAGONAL_RIGHT;
        }

        return MoveResult.NULL;
    }
}