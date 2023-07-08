import { UserDatabase } from '../domain/interfaces/user.interface';
import { Database } from '../domain/interfaces/database.interface';

class DataBase {
  private db: Database = {
    reg: [],
  };

  public createUser(userData: UserDatabase): void {
    this.db.reg.push(userData);
  }

  public getCountUsers(): number {
    return this.db.reg.length;
  }

  public getUser(index: number) {
    return this.db.reg.find((user) => user.index === index);
  }
}

export const dataBase = new DataBase();
