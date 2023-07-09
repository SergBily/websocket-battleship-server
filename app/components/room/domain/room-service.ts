import { userDatabase } from '../../user/data-access/user-database';
import { UserDatabase } from '../../user/domain/interfaces/user.interface';
import { roomDatabase } from '../data-access/room-database';
import { dataService } from './data-service';
import { ResponseUpdate } from './interfaces/response-update.interface';
import { Room } from './interfaces/room.interface';
import { messagesService } from './messages-service';

class RoomService {
  public async create(idClient: number): Promise<ResponseUpdate> {
    const user: UserDatabase | undefined = userDatabase.getUser(idClient);

    if (user) {
      const hasRoomUser: boolean = roomDatabase.hasRoomWitsPlayer(user.name);
      if (!hasRoomUser) {
        const roomId: number = roomDatabase.getCountRooms();
        const createdRoom: Room = dataService.createRoomData(roomId, user);
        roomDatabase.createRoom(createdRoom);
      }
    }
    const allRoomWithOnePlayer = roomDatabase.getRoomsWithOnePlayer();
    return messagesService.createUpdateRoomMessage(allRoomWithOnePlayer);
  }
}

export const roomService = new RoomService();
