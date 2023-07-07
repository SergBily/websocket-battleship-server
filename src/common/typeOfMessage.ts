import { userController } from '../controller/userController';
import { TypesMessages } from '../models/interfaces/typesMessages.interface';

export const typeOfMessage: TypesMessages = {
  reg: userController.login,
};
