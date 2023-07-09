import { clients } from '../../../libraries/common/clients';

export const sendMessagePlayers = (message: string) => {
  for (const client of Object.values(clients)) {
    client.send(message);
  }
};
