import { UserDatabase as User } from '../domain/interfaces/user.interface';
import { Database } from '../domain/interfaces/database.interface';
import { Winners } from '../domain/interfaces/winners.interface';

class UserDatabase {
  private db: Database = {
    reg: [],
    winners: [],
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

  public updateWinners(name: string): void {
    const hasPlayer = this.db.winners.find((player) => player.name === name);
    if (hasPlayer) {
      hasPlayer.wins += 1;
    }
    this.db.winners.push({
      name,
      wins: 1,
    });
  }

  public getWinners(): Winners[] {
    return this.db.winners;
  }

  public hasUser(name: string): boolean {
    return this.db.reg.some((user) => user.name === name);
  }
}

export const userDatabase = new UserDatabase();
