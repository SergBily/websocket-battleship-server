import { userDatabase } from '../../user/data-access/user-database';
import { UserDatabase } from '../../user/domain/interfaces/user.interface';
import { roomDatabase } from '../data-access/room-database';
import { dataService } from './data-service';
import { Room } from './interfaces/room.interface';
import { messagesGenerator } from '../../../libraries/common/messages-generator';

class RoomService {
  public async create(idClient: number): Promise<void> {
    const user: UserDatabase | undefined = userDatabase.getUser(idClient);

    if (user) {
      const hasRoomUser: boolean = roomDatabase.hasRoomWitsPlayer(user.name);
      if (!hasRoomUser) {
        const roomId: number = roomDatabase.getCountRooms();
        const createdRoom: Room = dataService.createRoomData(roomId, user);
        roomDatabase.createRoom(createdRoom);
      }
    }
  }

  public async addToRoom(roomId: number, idClient: number): Promise<void> {
    let currentRoom: Room | undefined = roomDatabase.getRoom(roomId);
    const user: UserDatabase | undefined = userDatabase.getUser(idClient);

    if (currentRoom && user && currentRoom.roomUsers[0].index !== idClient) {
      currentRoom = roomDatabase.addPlayerToRoom(
        roomId,
        { name: user.name, index: user.index },
      );
    }
  }

  public async getUpdateRoomsMwssages(): Promise<string> {
    const allRoomWithOnePlayer = roomDatabase.getRoomsWithOnePlayer();
    return messagesGenerator.createUpdateRoomMessage(allRoomWithOnePlayer);
  }
}

export const roomService = new RoomService();
