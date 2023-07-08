import { dataBase } from '../data-access/database';
import { User, UserDatabase } from './interfaces/user.interface';
import { ResponseRegData } from './interfaces/response-reg.interface';

class UserService {
  async login(userData: User): Promise<UserDatabase> {
    const count: number = dataBase.getCountUsers();
    dataBase.createUser({ index: count, ...userData });
    return dataBase.getUser(count) as UserDatabase;
  }
}

export const userService = new UserService();
