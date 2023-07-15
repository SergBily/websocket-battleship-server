import { gameDatabase } from '../data-access/game-database';
import { createPositionsShip } from './create-positions-ship';
import { CoordinateShips } from './interfaces/coordinate-ship.interface';
import { Players } from './interfaces/game-database.interface';
import { ShipsData } from './interfaces/ships-data.interface';

class GameService {
  public async addShips(gameBoard: ShipsData, idClient: number): Promise<Players[] | undefined> {
    const filledBoard: CoordinateShips = createPositionsShip(gameBoard.ships);
    gameDatabase.createGame(gameBoard.gameId, filledBoard, idClient);
    const room: Players[] | undefined = gameDatabase.addMessageGame(gameBoard, idClient);
    return room;
  }
}

export const gameService = new GameService();
