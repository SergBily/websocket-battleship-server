import { gameDatabase } from '../data-access/game-database';
import { createPositionsShip } from './create-positions-ship';
import { CoordinateShips } from './interfaces/coordinate-ship.interface';
import { Game } from './interfaces/game-database.interface';
import { ShipsData } from './interfaces/ships-data.interface';

class GameService {
  public async addShips(gameBoard: ShipsData, idClient: number): Promise<Game> {
    const filledBoard: CoordinateShips = createPositionsShip(gameBoard.ships);
    const createdGame = gameDatabase.createGame(gameBoard.gameId, filledBoard, idClient);
    return createdGame;
  }
}

export const gameService = new GameService();
