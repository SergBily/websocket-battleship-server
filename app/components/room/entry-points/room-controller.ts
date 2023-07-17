import { clients } from '../../../libraries/common/clients';
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
      sendMessagePlayers(messageUpdateRooms);
      for (const user of roomForGame.roomUsers) {
        const messageCreateGame: string = roomService.getcreateGameMessages(
          idClient,
          user.index,
        );
        clients[user.index].send(messageCreateGame);
        printMessage(messageCreateGame);
      }
    }
  }
}

export const roomController = new RoomController();
