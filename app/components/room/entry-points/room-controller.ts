import { jsonConverter } from '../../../libraries/utils/json-converter';
import { RequestAddRoom } from '../domain/interfaces/request-add-room.interface';
import { roomService } from '../domain/room-service';
import { sendMessagePlayers } from './message-sender';

class RoomController {
  public async create(_data: string, idClient: number): Promise<void> {
    await roomService.create(idClient);
    const messageUpdateRooms = await roomService.getUpdateRoomsMwssages();
    sendMessagePlayers(messageUpdateRooms);
  }

  public async addToRoom(data: string, idClient: number): Promise<void> {
    const roomId: RequestAddRoom = jsonConverter(data);
    const addRoom = await roomService.addToRoom(roomId.indexRoom, idClient);
    const messageUpdateRooms = await roomService.getUpdateRoomsMwssages();
    sendMessagePlayers(messageUpdateRooms);
  }
}

export const roomController = new RoomController();
