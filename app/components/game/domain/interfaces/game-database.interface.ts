import { ResponseMessage } from '../../../../libraries/models/interfaces/response-message.interface';
import { CoordinateShips } from './coordinate-ship.interface';
import { Ships } from './ships-data.interface';

export interface GameDatabase {
  games: Game[];
  gamesMessage: GameMessage[];
}

export interface Game {
  gameId: number;
  players: PlayerGame[];
}

interface PlayerGame {
  indexPlayer: number;
  ships: CoordinateShips;
}

export interface GameMessage {
  gameId: number;
  players: Players[];
}

export interface Players {
  ships: Ships[];
  currentPlayerIndex: number;
}
