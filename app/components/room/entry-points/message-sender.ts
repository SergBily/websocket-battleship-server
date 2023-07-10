import { clients } from '../../../libraries/common/clients';
import { RoomUsers } from '../domain/interfaces/room.interface';

export const sendMessagePlayers = (message: string) => {
  for (const client of Object.values(clients)) {
    client.send(message);
  }
};

export const sendMessageGamePlayers = (message: string, players: RoomUsers[]) => {
  for (const player of players) {
    clients[`${player.index}`].send(message);
  }
};
