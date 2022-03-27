export enum GameEngineEvent {
	PIECE_PLACED = "piece_placed",
	GAME_OVER = "game_over",
	GAME_START = "game_start",
	NEW_TURN = "new_turn",
}

export interface GameEngineEventData {
	x: number,
	y: number,
	player_id: number,
}