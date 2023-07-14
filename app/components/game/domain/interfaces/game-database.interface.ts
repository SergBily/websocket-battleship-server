import { CoordinateShips } from './coordinate-ship.interface';

export interface GameDatabase {
  games: Game[];
}

export interface Game {
  gameId: number;
  players: PlayerGame[]
}

interface PlayerGame {
  indexPlayer: number;
  ships: CoordinateShips;
}
