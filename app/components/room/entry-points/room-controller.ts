import { clients } from '../../../libraries/common/clients';
import { roomService } from '../domain/room-service';

class RoomController {
  public async create(_data: string, idClient: number): Promise<void> {
    const rooms: string = await roomService.create(idClient - 1);

    for (const client of Object.values(clients)) {
      client.send(rooms);
    }
  }
}

export const roomController = new RoomController();
