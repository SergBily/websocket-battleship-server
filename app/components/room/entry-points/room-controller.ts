import { jsonConverter } from '../../../libraries/utils/json-converter';
import { printMessage } from '../../../libraries/utils/print-message';
import { RequestAddRoom } from '../domain/interfaces/request-add-room.interface';
import { Room } from '../domain/interfaces/room.interface';
import { roomService } from '../domain/room-service';
import { sendMessageGamePlayers, sendMessagePlayers } from './message-sender';

class RoomController {
  public async create(_data: string, idClient: number): Promise<void> {
    await roomService.createRoom(idClient);
    const messageUpdateRooms = await roomService.getUpdateRoomsMessages();
    sendMessagePlayers(messageUpdateRooms);
    printMessage(messageUpdateRooms);
  }

  public async addToRoom(data: string, idClient: number): Promise<void> {
    const roomId: RequestAddRoom = jsonConverter(data);
    const roomForGame: Room | undefined = await roomService.addPlayerToRoom(
      roomId.indexRoom,
      idClient,
    );
    if (roomForGame) {
      const messageUpdateRooms: string = await roomService.getUpdateRoomsMessages();
      const messageCreateGame: string = await roomService.getcreateGameMessages(idClient);
      sendMessagePlayers(messageUpdateRooms);
      sendMessageGamePlayers(messageCreateGame, roomForGame.roomUsers);
      printMessage(messageCreateGame);
    }
  }
}

export const roomController = new RoomController();
