import { WebSocket } from 'ws';
import { typeOfMessage } from '../common/typeOfMessage';
import { KeysOfTypesMessages } from '../models/types/keysOfInterfaces';

export const router = (type: string, payload: string, ws: WebSocket) => {
  const handlerMessage = typeOfMessage[type as KeysOfTypesMessages];
  handlerMessage(payload, ws);
};
