export enum GameEngineEvent {
  PIECE_PLACED = "piece_placed",
  GAME_OVER = "game_over"
}

export interface GameEngineEventData {
  x: number,
  y: number,
  player_id: number,
}