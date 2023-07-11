import { UserDatabase } from './user.interface';

export interface ResponseLogin {
  user: UserDatabase;
  roomsMessage: string;
}
