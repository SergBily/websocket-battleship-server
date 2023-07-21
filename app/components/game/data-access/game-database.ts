import { Attack } from '../domain/interfaces/attack.interface';
import { CoordinateAttack, CoordinateShips } from '../domain/interfaces/coordinate-ship.interface';
import {
  GameDatabase as Database, Game, GameMessage, PlayerGame, Players,
} from '../domain/interfaces/game-database.interface';
import { ShipsData } from '../domain/interfaces/ships-data.interface';

class GameDatabase {
  private db: Database = {
    games: [],
    gamesMessage: [],
  };

  public createGame(
    gameId: number,
    ships: Record <string, CoordinateShips>,
    indexPlayer: number,
  ): void {
    const finededGame: Game | undefined = this.db.games.find(
      (game) => game.gameId === gameId,
    );

    if (finededGame && finededGame.players.length < 2) {
      const secondPlayer = { indexPlayer, ships };
      finededGame.players.push(secondPlayer);
    } else {
      this.firstGame(gameId, ships, indexPlayer);
    }
  }

  public addMessageGame(ships: ShipsData, indexPlayer: number): Players[] | undefined {
    let room: Players[] | undefined;
    const finededGame: GameMessage | undefined = this.db.gamesMessage.find(
      (game) => game.gameId === ships.gameId,
    );

    if (finededGame && finededGame.players.length < 2) {
      const secondPlayer: Players = { currentPlayerIndex: indexPlayer, ships: ships.ships };
      finededGame.players.push(secondPlayer);
      room = finededGame.players;
    } else {
      this.firstGameMessage(ships, indexPlayer);
    }
    return room;
  }

  private firstGameMessage(ships: ShipsData, indexPlayer: number): void {
    const newMessageGame: GameMessage = {
      gameId: ships.gameId,
      players: [{ currentPlayerIndex: indexPlayer, ships: ships.ships }],
    };
    this.db.gamesMessage.push(newMessageGame);
  }

  private firstGame(
    gameId: number,
    ships: Record <string, CoordinateShips>,
    indexPlayer: number,
  ): void {
    const newGame: Game = {
      gameId,
      players: [{ indexPlayer, ships }],
      currentPlayer: indexPlayer,
    };
    this.db.games.push(newGame);
  }

  public getCurrentPlayerGame(gameId: number): number {
    const game: Game | undefined = this.db.games.find((g) => g.gameId === gameId);
    if (game) {
      return game.currentPlayer;
    }
    return 0;
  }

  public updateCurrentPlayerGame(gameId: number, currentPlayer: number): void {
    const game: Game | undefined = this.db.games.find((g) => g.gameId === gameId);
    if (game) {
      game.currentPlayer = currentPlayer;
    }
  }

  public getPlayersGame(gameId: number): PlayerGame[] | undefined {
    const game: Game | undefined = this.db.games.find((g) => g.gameId === gameId);
    if (game) {
      return game.players;
    }
    return undefined;
  }

  public attack(gameData: Attack): string {
    const game: Game | undefined = this.db.games.find((g) => g.gameId === gameData.gameId);
    let status = 'miss';
    if (game) {
      const enemy = game.players.find((p) => p.indexPlayer !== gameData.indexPlayer) as PlayerGame;
      const ship: number | undefined = this.checkCoordinate(
        enemy.ships,
        { x: gameData.x, y: gameData.y },
      );

      if (ship || ship === 0) {
        status = this.moveGoalCoordinates(enemy.ships, ship, gameData);
      }
    }
    return status;
  }

  private checkCoordinate(
    coordinateShip: Record <string, CoordinateShips>,
    attackCoordinate: CoordinateAttack,
  ): number | undefined {
    let findedShip;
    for (const [key, coordinates] of Object.entries(coordinateShip)) {
      if (coordinates.closePosition.x.includes(attackCoordinate.x)
      && coordinates.closePosition.y.includes(attackCoordinate.y)) {
        findedShip = +key;
      }
    }
    return findedShip;
  }

  private moveGoalCoordinates(
    ships:Record<string, CoordinateShips>,
    ship: number,
    { x, y }: Attack,
  ): string {
    const { x: fromAxisX, y: fromAxisY } = ships[ship].closePosition;
    const { x: toAxisX, y: toAxisY } = ships[ship].openPosition;
    const moveXCoordinate = fromAxisX.splice(fromAxisX.indexOf(x), 1);
    const moveYCoordinate = fromAxisY.splice(fromAxisY.indexOf(y), 1);
    toAxisX.push(...moveXCoordinate);
    toAxisY.push(...moveYCoordinate);
    const isWin = this.checkWinner(ships);
    if (isWin) {
      return 'win';
    }
    return fromAxisX.length === 0 && fromAxisY.length === 0 ? 'killed' : 'shot';
  }

  private checkWinner(ships: Record<string, CoordinateShips>): string {
    let killedShips = 0;
    for (const ship of Object.values(ships)) {
      killedShips += +(ship.closePosition.x.length === 0 && ship.closePosition.y.length === 0);
    }
    return killedShips === 10 ? 'win' : '';
  }
}

export const gameDatabase = new GameDatabase();
