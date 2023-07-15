import { clients } from '../../../libraries/common/clients';
import { messagesGenerator } from '../../../libraries/common/messages-generator';
import { TypeMessages } from '../../../libraries/models/enums/type-messages.enum';
import { jsonConverter } from '../../../libraries/utils/json-converter';
import { printMessage } from '../../../libraries/utils/print-message';
import { gameService } from '../domain/game-service';
import { Players } from '../domain/interfaces/game-database.interface';
import { ShipsData } from '../domain/interfaces/ships-data.interface';

class GameController {
  public async addShips(data: string, idClient: number): Promise<void> {
    const gameBoard: ShipsData = jsonConverter(data);
    const room: Players[] | undefined = await gameService.addShips(gameBoard, idClient);

    if (room) {
      for (const player of room) {
        const message: string = messagesGenerator.generateMessage(player, TypeMessages.start_game);
        clients[`${player.currentPlayerIndex}`].send(message);
        printMessage(message);
      }
    }
  }
}

export const gameController = new GameController();
