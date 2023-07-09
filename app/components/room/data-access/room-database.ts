import { RoomDatabase as Database } from '../domain/interfaces/room-database.interface';
import { Room, RoomUsers } from '../domain/interfaces/room.interface';

class RoomDatabase {
  db: Database = {
    rooms: [],
  };

  public createRoom(newRoom: Room): void {
    this.db.rooms.push(newRoom);
  }

  public getCountRooms(): number {
    return this.db.rooms.length;
  }

  public getRoomsWithOnePlayer(): Room[] {
    return this.db.rooms.filter((room) => room.roomUsers.length === 1);
  }

  public hasRoomWitsPlayer(name: string): boolean {
    let user!: RoomUsers | undefined;
    for (let index = 0; index < this.db.rooms.length; index += 1) {
      const findedUser = this.db.rooms[index].roomUsers.find((u) => u.name === name);
      if (findedUser) {
        user = findedUser;
        break;
      }
    }
    return !!user;
  }
}

export const roomDatabase = new RoomDatabase();
