import { ShipsData } from '../domain/interfaces/ships-data.interface';

class GameController {
  public async addShips(data: string, idClient: number) {
    // console.log( idClient, 1);
    const bb: ShipsData = JSON.parse(data);
    console.log(bb);

    for (const ship of bb.ships) {
      console.log(ship.position);
    }
  }
}

export const gameController = new GameController();
