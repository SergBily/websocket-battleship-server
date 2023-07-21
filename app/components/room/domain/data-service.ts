import { UserDatabase } from '../../user/domain/interfaces/user.interface';
import { Room } from './interfaces/room.interface';

class DataService {
  public createRoomData(roomId: number, user: UserDatabase): Room {
    return {
      roomId,
      roomUsers: [{ name: user.name, index: user.index }],
    };
  }
}

export const dataService = new DataService();
