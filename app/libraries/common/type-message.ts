import { userController } from '../../components/user/entry-points/user-controller';
import { TypesMessages } from '../../components/user/domain/interfaces/types-messages.interface';

export const typeOfMessage: TypesMessages = {
  reg: userController.login,
};
