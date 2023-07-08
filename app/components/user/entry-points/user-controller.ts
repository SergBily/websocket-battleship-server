import { WebSocket } from 'ws';
import { TypeMessages } from '../../../libraries/models/enums/type-messages.enum';
import { StructureMessage } from '../../../libraries/models/interfaces/structure-message.interface';
import { userService } from '../domain/user-service';
import { createSendMessage } from '../../../libraries/utils/create-send-message';
import { jsonConverter } from '../../../libraries/utils/json-converter';
import { printMessage } from '../../../libraries/utils/print-message';
import { User, UserDatabase } from '../domain/interfaces/user.interface';
import { UserDto } from '../domain/dtos/user-dto';
import { ResponseRegData } from '../domain/interfaces/response-reg.interface';

class UserController {
  async login(payload: string, ws: WebSocket) {
    const decodedPayload: User = jsonConverter(payload);
    const user: UserDatabase = await userService.login(decodedPayload);
    const userDto: ResponseRegData = new UserDto(user);
    const messageClient: StructureMessage = createSendMessage(
      TypeMessages.reg,
      jsonConverter<ResponseRegData>(userDto),
    );
    const decodedMessage = jsonConverter<StructureMessage>(messageClient);

    printMessage<StructureMessage>(messageClient);
    ws.send(decodedMessage);
  }
}

export const userController = new UserController();
