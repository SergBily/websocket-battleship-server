import { userController } from '../../components/user/entry-points/user-controller';
import { TypesMessages } from '../models/interfaces/types-messages.interface';
import { roomController } from '../../components/room/entry-points/room-controller';

export const typeOfMessage: TypesMessages = {
  reg: userController.login,
  create_room: roomController.create,
  add_user_to_room: roomController.addToRoom,
};
