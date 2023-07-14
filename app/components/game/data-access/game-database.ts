import { CoordinateShips } from '../domain/interfaces/coordinate-ship.interface';
import { GameDatabase as Database, Game } from '../domain/interfaces/game-database.interface';

class GameDatabase {
  db: Database = {
    games: [],
  };

  public createGame(gameId: number, ships: CoordinateShips, indexPlayer: number): Game {
    const newGame: Game = {
      gameId,
      players: [{
        indexPlayer,
        ships,
      }],
    };
    this.db.games.push(newGame);
    return newGame;
  }
}

export const gameDatabase = new GameDatabase();
