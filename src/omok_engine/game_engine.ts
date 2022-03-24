import Player from './player';
import Board from './board';
import { MoveStatus } from './move_status';

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
        const new_player = new Player(board);

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
        if (!is_move_valid) return MoveStatus.INVALID;

        this.players[this.current_player].place_piece(x, y);
        
        const is_move_win = this.is_move_win(x, y);

        this.current_player = (this.current_player+1) % this.players.length;

        if (is_move_win) return MoveStatus.VICTORY;

        return is_move_valid;
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
        let is_move_win = false;
        
        for (let i = 0; i < player_bitboard.length-2; i++){
            const row1 = Number(player_bitboard[i].join(""));
            const row2 = Number(player_bitboard[i+1].join(""));
            const row3 = Number(player_bitboard[i+2].join(""));

            is_move_win = ((row1 & row2 & row3) != 0);

            if (is_move_win) break;
        }
        console.log(is_move_win);
        return is_move_win;
    }
}