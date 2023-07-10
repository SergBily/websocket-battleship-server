import { messagesGenerator } from '../../../libraries/common/messages-generator';
import { TypeMessages } from '../../../libraries/models/enums/type-messages.enum';
import { roomDatabase } from '../../room/data-access/room-database';
import { userDatabase } from '../data-access/user-database';
import { User, UserDatabase } from './interfaces/user.interface';

class UserService {
  async login(userData: User): Promise<{ user: UserDatabase, roomsMessage: string }> {
    const count: number = userDatabase.getCountUsers();
    userDatabase.createUser({ index: count, ...userData });
    const allRoomWithOnePlayer = roomDatabase.getRoomsWithOnePlayer();
    const roomsMessage = messagesGenerator.generateMessage(
      allRoomWithOnePlayer,
      TypeMessages.update_room,
    );
    return { user: userDatabase.getUser(count) as UserDatabase, roomsMessage };
  }
}

export const userService = new UserService();
