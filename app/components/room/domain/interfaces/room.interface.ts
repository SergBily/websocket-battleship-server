export interface Room {
  roomId:number;
  roomUsers: RoomUsers[]
}

export interface RoomUsers {
  name: string;
  index: number;
}
