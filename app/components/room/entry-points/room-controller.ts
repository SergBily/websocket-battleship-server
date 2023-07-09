import { clients } from '../../../libraries/common/clients';
import { jsonConverter } from '../../../libraries/utils/json-converter';
import { ResponseUpdate } from '../domain/interfaces/response-update.interface';
import { roomService } from '../domain/room-service';

class RoomController {
  public async create(data: string, idClient: number): Promise<void> {
    const rooms: ResponseUpdate = await roomService.create(idClient - 1);
    const decodedRooms = jsonConverter({
      type: rooms.type,
      data: jsonConverter(rooms.data),
      id: rooms.id,
    });

    for (const client of Object.values(clients)) {
      client.send(decodedRooms);
    }
  }
}

export const roomController = new RoomController();
