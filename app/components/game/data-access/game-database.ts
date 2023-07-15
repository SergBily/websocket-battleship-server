import { CoordinateShips } from '../domain/interfaces/coordinate-ship.interface';
import {
  GameDatabase as Database, Game, GameMessage, Players,
} from '../domain/interfaces/game-database.interface';
import { ShipsData } from '../domain/interfaces/ships-data.interface';

class GameDatabase {
  db: Database = {
    games: [],
    gamesMessage: [],
  };

  public createGame(gameId: number, ships: CoordinateShips, indexPlayer: number): void {
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

  private firstGame(gameId: number, ships: CoordinateShips, indexPlayer: number): void {
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
}

export const gameDatabase = new GameDatabase();
