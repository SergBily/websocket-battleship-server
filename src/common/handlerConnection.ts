import WebSocket from 'ws';
import { decodedMessage } from '../middlewares/decodedMessage';
import { router } from '../router/router';

class HandlerConnection {
  public close() {
    console.log('user disconnected');
  }

  public error(err: Error) {
    console.log(err, 'err');
  }

  public message(ws: WebSocket, data: WebSocket.RawData) {
    const { type, payload } = decodedMessage(data);
    router(type, payload, ws);
  }
}

export const handlerConnection = new HandlerConnection();
