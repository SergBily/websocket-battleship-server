import { userDatabase } from '../../user/data-access/user-database';
import { UserDatabase } from '../../user/domain/interfaces/user.interface';
import { Winners } from '../../user/domain/interfaces/winners.interface';
import { gameDatabase } from '../data-access/game-database';
import { createPositionsShip } from './create-positions-ship';
import { Attack } from './interfaces/attack.interface';
import { CoordinateShips } from './interfaces/coordinate-ship.interface';
import { Players } from './interfaces/game-database.interface';
import { ResponseAttack } from './interfaces/response-attack.interface';
import { ResponseCurrentPlayer } from './interfaces/response-current-player.interface';
import { ShipsData } from './interfaces/ships-data.interface';

class GameService {
  public async addShips(gameBoard: ShipsData, idClient: number): Promise<Players[] | undefined> {
    const filledBoard: Record <string, CoordinateShips> = createPositionsShip(gameBoard.ships);
    gameDatabase.createGame(gameBoard.gameId, filledBoard, idClient);
    const room: Players[] | undefined = gameDatabase.addMessageGame(gameBoard, idClient);
    return room;
  }

  public async getPlayerGoes(gameId: number): Promise<number> {
    return gameDatabase.getCurrentPlayerGame(gameId);
  }

  public async updateCurrentPlayerGame(gameId: number, currentPlayer: number): Promise<void> {
    gameDatabase.updateCurrentPlayerGame(gameId, currentPlayer);
  }

  public async attack(gameData: Attack): Promise<ResponseAttack> {
    const playersGame = gameDatabase.getPlayersGame(gameData.gameId);
    const status = gameDatabase.attack(gameData);
    let winners!: Winners[];
    if (status === 'win') {
      const user = userDatabase.getUser(gameData.indexPlayer) as UserDatabase;
      userDatabase.updateWinners(user?.name);
      winners = userDatabase.getWinners();
    }
    return { playersGame, status, winners };
  }

  public async changeCurrentGame(
    responseAttack: ResponseAttack,
    gameId: number,
  ): Promise<ResponseCurrentPlayer> {
    const currentPlayer = await this.getPlayerGoes(gameId);
    const dataTurn = {
      currentPlayer,
    };

    if (responseAttack.status === 'miss') {
      dataTurn.currentPlayer = responseAttack.playersGame?.find(
        (player) => player.indexPlayer !== currentPlayer,
      )?.indexPlayer as number;
      this.updateCurrentPlayerGame(gameId, dataTurn.currentPlayer);
    }
    return dataTurn;
  }
}

export const gameService = new GameService();
