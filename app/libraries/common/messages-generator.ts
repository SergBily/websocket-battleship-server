import { TypeMessages } from '../models/enums/type-messages.enum';
import { jsonConverter } from '../utils/json-converter';
import { Room } from '../../components/room/domain/interfaces/room.interface';

class MessagesGenerator {
  createUpdateRoomMessage(data: Room[]): string {
    return jsonConverter({
      type: TypeMessages.update_room,
      data: jsonConverter(data),
      id: 0,
    });
  }
}

export const messagesGenerator = new MessagesGenerator();
