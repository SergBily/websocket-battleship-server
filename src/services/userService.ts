import { dataBase } from '../models/db';
import { User, UserDatabase } from '../models/interfaces/User.interface';
import { ResponseRegData } from '../models/interfaces/responseReg.interface';

class UserService {
  async login(userData: User): Promise<ResponseRegData> {
    const count: number = dataBase.getCountUsers();
    dataBase.createUser({ index: count, ...userData });
    const createdUser = dataBase.getUser(count) as UserDatabase;
    return { ...createdUser, error: false, errorText: '' };
  }
}

export const userService = new UserService();
