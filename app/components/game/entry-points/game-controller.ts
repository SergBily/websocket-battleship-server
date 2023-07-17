import { clients } from '../../../libraries/common/clients';
import { messagesGenerator } from '../../../libraries/common/messages-generator';
import { TypeMessages } from '../../../libraries/models/enums/type-messages.enum';
import { jsonConverter } from '../../../libraries/utils/json-converter';
import { printMessage } from '../../../libraries/utils/print-message';
import { gameService } from '../domain/game-service';
import { Attack } from '../domain/interfaces/attack.interface';
import { Players } from '../domain/interfaces/game-database.interface';
import { ResponseAttack } from '../domain/interfaces/response-attack.interface';
import { ResponseCurrentPlayer } from '../domain/interfaces/response-current-player.interface';
import { ShipsData } from '../domain/interfaces/ships-data.interface';

class GameController {
  public async addShips(data: string, idClient: number): Promise<void> {
    const gameBoard: ShipsData = jsonConverter(data);
    const room: Players[] | undefined = await gameService.addShips(gameBoard, idClient);
    const currentPlayer: number = await gameService.getPlayerGoes(gameBoard.gameId);

    if (room) {
      for (const player of room) {
        const message: string = messagesGenerator.generateMessage(player, TypeMessages.start_game);
        const messageTurn: string = messagesGenerator.generateMessage(
          { currentPlayer },
          TypeMessages.turn,
        );
        clients[`${player.currentPlayerIndex}`].send(message);
        clients[`${player.currentPlayerIndex}`].send(messageTurn);
        printMessage(message);
        printMessage(messageTurn);
      }
    }
  }

  public async attack(data: string, _idClient: number): Promise<void> {
    const gameData: Attack = jsonConverter(data);
    const responseAttack: ResponseAttack = await gameService.attack(gameData);
    const dataAttackMessage = {
      position: {
        x: gameData.x,
        y: gameData.y,
      },
      currentPlayer: gameData.indexPlayer,
      status: responseAttack.status,
    };
    const dataTurnMessage: ResponseCurrentPlayer = await gameService.changeCurrentGame(
      responseAttack,
      gameData.gameId,
    );
    const messageAttack: string = messagesGenerator.generateMessage(
      dataAttackMessage,
      TypeMessages.attack,
    );
    const messageTurn: string = messagesGenerator.generateMessage(
      dataTurnMessage,
      TypeMessages.turn,
    );

    if (responseAttack.playersGame) {
      for (const player of responseAttack.playersGame) {
        clients[player.indexPlayer].send(messageAttack);
        clients[player.indexPlayer].send(messageTurn);
        printMessage(messageAttack);
        printMessage(messageTurn);
      }
    }
  }
}

export const gameController = new GameController();
