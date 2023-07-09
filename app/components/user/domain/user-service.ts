import { userDatabase } from '../data-access/user-database';
import { User, UserDatabase } from './interfaces/user.interface';

class UserService {
  async login(userData: User): Promise<UserDatabase> {
    const count: number = userDatabase.getCountUsers();
    userDatabase.createUser({ index: count, ...userData });
    return userDatabase.getUser(count) as UserDatabase;
  }
}

export const userService = new UserService();
