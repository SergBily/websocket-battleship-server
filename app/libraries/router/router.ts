import { WebSocket } from 'ws';
import { typeOfMessage } from '../common/type-message';
import { KeysOfTypesMessages } from '../models/types/keys-interfaces';

export const router = (type: string, payload: string, ws: WebSocket) => {
  const handlerMessage = typeOfMessage[type as KeysOfTypesMessages];
  handlerMessage(payload, ws);
};
