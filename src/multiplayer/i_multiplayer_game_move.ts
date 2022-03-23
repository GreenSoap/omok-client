import type PlayerBase from "./player_base";

export default interface IMultiplayerGameMove {
    x: number,
    y: number,
    player: PlayerBase
}