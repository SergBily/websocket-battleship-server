import { messagesGenerator } from '../../../libraries/common/messages-generator';
import { TypeMessages } from '../../../libraries/models/enums/type-messages.enum';
import { roomDatabase } from '../../room/data-access/room-database';
import { userDatabase } from '../data-access/user-database';
import { ResponseLogin } from './interfaces/response-login.interface';
import { User, UserDatabase } from './interfaces/user.interface';

class UserService {
  public async login(userData: User, index: number): Promise<ResponseLogin> {
    userDatabase.createUser({ index, ...userData });
    const allRoomWithOnePlayer = roomDatabase.getRoomsWithOnePlayer();
    const roomsMessage = messagesGenerator.generateMessage(
      allRoomWithOnePlayer,
      TypeMessages.update_room,
    );
    return {
      user: userDatabase.getUser(index) as UserDatabase,
      roomsMessage,
      winners: userDatabase.getWinners(),
    };
  }

  public async checkUser(name: string): Promise<boolean> {
    return userDatabase.hasUser(name);
  }
}

export const userService = new UserService();
