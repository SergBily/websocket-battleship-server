import { UserDatabase } from './user.interface';
import { Winners } from './winners.interface';

export interface ResponseLogin {
  user: UserDatabase;
  roomsMessage: string;
  winners: Winners[];
}
