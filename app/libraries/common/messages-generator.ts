import { jsonConverter } from '../utils/json-converter';
import { Room } from '../../components/room/domain/interfaces/room.interface';

class MessagesGenerator {
  generateMessage<T>(data: T, type: string): string {
    return jsonConverter({
      type,
      data: jsonConverter(data),
      id: 0,
    });
  }
}

export const messagesGenerator = new MessagesGenerator();
