import { userDatabase } from '../../user/data-access/user-database';
import { UserDatabase } from '../../user/domain/interfaces/user.interface';
import { roomDatabase } from '../data-access/room-database';
import { dataService } from './data-service';
import { Room } from './interfaces/room.interface';
import { messagesGenerator } from '../../../libraries/common/messages-generator';
import { TypeMessages } from '../../../libraries/models/enums/type-messages.enum';
import { ResponseDataMessage } from './interfaces/response-data-message.interface';

class RoomService {
  public async createRoom(idClient: number): Promise<void> {
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

  public async addPlayerToRoom(roomId: number, idClient: number): Promise<Room> {
    let currentRoom: Room | undefined = roomDatabase.getRoom(roomId);
    const user: UserDatabase | undefined = userDatabase.getUser(idClient);

    if (currentRoom && user && currentRoom.roomUsers[0].index !== idClient) {
      currentRoom = roomDatabase.addPlayerToRoom(
        roomId,
        { name: user.name, index: user.index },
      );
    }
    return currentRoom as Room;
  }

  public async getUpdateRoomsMessages(): Promise<string> {
    const allRoomWithOnePlayer = roomDatabase.getRoomsWithOnePlayer();
    return messagesGenerator.generateMessage(allRoomWithOnePlayer, TypeMessages.update_room);
  }

  public async getcreateGameMessages(idGame: number): Promise<string> {
    return messagesGenerator.generateMessage<ResponseDataMessage>(
      { idGame },
      TypeMessages.create_game,
    );
  }
}

export const roomService = new RoomService();
