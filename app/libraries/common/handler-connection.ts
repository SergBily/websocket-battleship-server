import WebSocket from 'ws';
import { decodedMessage } from './decoded-message';
import { router } from '../router/router';

class HandlerConnection {
  public close() {
    console.log('user disconnected');
  }

  public error(error: Error) {
    console.log(error, 'err');
  }

  public message(idClient: number, data: WebSocket.RawData) {
    const { type, payload } = decodedMessage(data);
    router(type, payload, idClient);
  }
}

export const handlerConnection = new HandlerConnection();
