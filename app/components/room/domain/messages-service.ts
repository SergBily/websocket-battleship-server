import { TypeMessages } from '../../../libraries/models/enums/type-messages.enum';
import { ResponseUpdate } from './interfaces/response-update.interface';
import { Room } from './interfaces/room.interface';

class MessagesService {
  createUpdateRoomMessage(data: Room[]): ResponseUpdate {
    return {
      type: TypeMessages.update_room,
      data,
      id: 0,
    };
  }
}

export const messagesService = new MessagesService();
