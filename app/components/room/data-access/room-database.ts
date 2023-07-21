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

  public getRoom(roomId: number): Room | undefined {
    return this.db.rooms.find((room) => room.roomId === roomId);
  }

  public addPlayerToRoom(roomId: number, user: RoomUsers): Room {
    let updatedRoom!: Room;
    for (const room of this.db.rooms) {
      if (room.roomId === roomId) {
        room.roomUsers.push(user);
        updatedRoom = room;
      }
    }
    return updatedRoom;
  }

  public deleteRoom(roomId: number): void {
   const room: Room | undefined =  this.db.rooms.find(room => room.roomId === roomId);
   if (room) {
    this.db.rooms.splice(this.db.rooms.indexOf(room), 1)
   }
  }
}

export const roomDatabase = new RoomDatabase();
