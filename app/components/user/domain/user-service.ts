import { dataBase } from '../data-access/database';
import { User, UserDatabase } from './interfaces/user.interface';
import { ResponseRegData } from './interfaces/response-reg.interface';

class UserService {
  async login(userData: User): Promise<ResponseRegData> {
    const count: number = dataBase.getCountUsers();
    dataBase.createUser({ index: count, ...userData });
    const createdUser = dataBase.getUser(count) as UserDatabase;
    return { ...createdUser, error: false, errorText: '' };
  }
}

export const userService = new UserService();
