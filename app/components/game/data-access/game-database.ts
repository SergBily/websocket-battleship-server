import { Attack } from '../domain/interfaces/attack.interface';
import { CoordinateAttack, CoordinateShips, Coordinates } from '../domain/interfaces/coordinate-ship.interface';
import {
  GameDatabase as Database, Game, GameMessage, PlayerGame, Players,
} from '../domain/interfaces/game-database.interface';
import { ShipsData } from '../domain/interfaces/ships-data.interface';

class GameDatabase {
  db: Database = {
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

  public attack(gameData: Attack) {
    const game: Game | undefined = this.db.games.find((g) => g.gameId === gameData.gameId);
    if (game) {
      const enemy = game.players.find((p) => p.indexPlayer !== gameData.indexPlayer) as PlayerGame;
      const ship: number | undefined = this.checkCoordinate(
        enemy.ships,
        { x: gameData.x, y: gameData.y },
      );

      if (ship) {
        this.moveGoalCoordinates(enemy.ships, ship, gameData);
      }
    }
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
  ) {
    const { x: fromAxisX, y: fromAxisY } = ships[ship].closePosition;
    const { x: toAxisX, y: toAxisY } = ships[ship].openPosition;
    const moveXCoordinate = fromAxisX.splice(fromAxisX.indexOf(x), 1);
    const moveYCoordinate = fromAxisY.splice(fromAxisY.indexOf(y), 1);
    toAxisX.push(...moveXCoordinate);
    toAxisY.push(...moveYCoordinate);
    for (const iterator of this.db.games) {
      for (const iterator2 of iterator.players) {
        console.table(iterator2.ships[ship]);
      }
    }
  }
}

export const gameDatabase = new GameDatabase();
