import { UserDatabase } from './user.interface';
import { Winners } from './winners.interface';

export interface Database {
  reg: UserDatabase[];
  winners: Winners[];
}
