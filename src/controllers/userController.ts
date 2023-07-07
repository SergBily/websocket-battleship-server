import { WebSocket } from 'ws';
import { TypeMessages } from '../models/enums/typeMessages.enum';
import { User } from '../models/interfaces/User.interface';
import { ResponseRegData } from '../models/interfaces/responseReg.interface';
import { StructureMessage } from '../models/interfaces/structureMessage.interface';
import { userService } from '../services/userService';
import { createSendMessage } from '../utils/createSendMessage';
import { jsonConverter } from '../utils/jsonConverter';
import { printMessage } from '../utils/printMessage';

class UserController {
  async login(payload: string, ws: WebSocket) {
    const decodedPayload: User = jsonConverter(payload);
    const user: ResponseRegData = await userService.login(decodedPayload);
    const messageClient: StructureMessage = createSendMessage(
      TypeMessages.reg,
      jsonConverter<ResponseRegData>(user),
    );
    const decodedMessage = jsonConverter<StructureMessage>(messageClient);
    printMessage<StructureMessage>(messageClient);
    ws.send(decodedMessage);
  }
}

export const userController = new UserController();
