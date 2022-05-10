export enum GameEngineEvent {
  /**
   * Fired when a piece is placed on the board.
   */
  PIECE_PLACED = "piece_placed",

  /**
   * @deprecated Moved to GlobalEvent
   */
  PIECE_CLICKED = "piece_clicked",

  /**
   * Fired when the game is over.
   */
  GAME_OVER = "game_over",

  /**
   * Fired when the game is started.
   */
  GAME_START = "game_start",

  /**
   * Fired when a new turn is started.
   */
  NEW_TURN = "new_turn",
}

export enum GlobalEvent {
  /**
   * Fired when a piece is clicked on the board.
   */
  PIECE_CLICKED = "piece_clicked",
}

export interface GameEngineEventData {
  x: number,
  y: number,
  player_id: number,
}