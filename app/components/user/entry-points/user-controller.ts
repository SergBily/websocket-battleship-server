import { TypeMessages } from '../../../libraries/models/enums/type-messages.enum';
import { StructureMessage } from '../../../libraries/models/interfaces/structure-message.interface';
import { userService } from '../domain/user-service';
import { createSendMessage } from '../../../libraries/utils/create-send-message';
import { jsonConverter } from '../../../libraries/utils/json-converter';
import { printMessage } from '../../../libraries/utils/print-message';
import { User } from '../domain/interfaces/user.interface';
import { UserDto } from '../domain/dtos/user-dto';
import { ResponseRegData } from '../domain/interfaces/response-reg.interface';
import { clients } from '../../../libraries/common/clients';
import { messagesGenerator } from '../../../libraries/common/messages-generator';

class UserController {
  async login(payload: string, idClient: number) {
    const decodedPayload: User = jsonConverter(payload);
    const isUser = await userService.checkUser(decodedPayload.name);
    if (isUser) return;
    const { user, roomsMessage, winners } = await userService.login(decodedPayload, idClient);
    const userDto: ResponseRegData = new UserDto(user);
    const messageClient: StructureMessage = createSendMessage(
      TypeMessages.reg,
      jsonConverter<ResponseRegData>(userDto),
    );
    const decodedMessage = jsonConverter<StructureMessage>(messageClient);

    printMessage<StructureMessage>(messageClient);
    const currentClient = clients[`${idClient}`];
    currentClient.send(decodedMessage);
    currentClient.send(roomsMessage);
    const messageWin: string = messagesGenerator.generateMessage(
      winners,
      TypeMessages.update_winners,
    );
    for (const client of Object.values(clients)) {
      client.send(messageWin);
      printMessage(messageWin);
    }
  }
}

export const userController = new UserController();
