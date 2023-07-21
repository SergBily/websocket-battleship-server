import { CoordinateShips } from './coordinate-ship.interface';
import { Ships } from './ships-data.interface';

export interface GameDatabase {
  games: Game[];
  gamesMessage: GameMessage[];
}

export interface Game {
  gameId: number;
  players: PlayerGame[];
  currentPlayer: number
}

export interface PlayerGame {
  indexPlayer: number;
  ships: Record <string, CoordinateShips>;
}

export interface GameMessage {
  gameId: number;
  players: Players[];
}

export interface Players {
  ships: Ships[];
  currentPlayerIndex: number;
}
