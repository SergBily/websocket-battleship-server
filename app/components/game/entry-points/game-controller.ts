import { jsonConverter } from '../../../libraries/utils/json-converter';
import { gameService } from '../domain/game-service';
import { ShipsData } from '../domain/interfaces/ships-data.interface';

class GameController {
  public async addShips(data: string, idClient: number): Promise<void> {
    const gameBoard: ShipsData = jsonConverter(data);
    const bb = await gameService.addShips(gameBoard, idClient);
    console.log(bb.players);

    // console.log(gameBoard, 1);

    // for (const ship of gameBoard.ships) {
    //   console.log(ship.position);
    // }
  }
}

export const gameController = new GameController();
