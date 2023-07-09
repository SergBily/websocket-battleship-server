import { UserDatabase as User } from '../domain/interfaces/user.interface';
import { Database } from '../domain/interfaces/database.interface';

class UserDatabase {
  private db: Database = {
    reg: [],
  };

  public createUser(userData: User): void {
    this.db.reg.push(userData);
  }

  public getCountUsers(): number {
    return this.db.reg.length;
  }

  public getUser(index: number): User | undefined {
    return this.db.reg.find((user) => user.index === index);
  }
}

export const userDatabase = new UserDatabase();
