import WebSocket from 'ws';
import { jsonConverter } from '../utils/json-converter';
import { StructureMessage } from '../models/interfaces/structure-message.interface';

export const decodedMessage = (message: WebSocket.RawData) => {
  const messageUtf8 = message.toString();
  const convertedMessage: StructureMessage = jsonConverter(messageUtf8);
  return { type: convertedMessage.type, payload: convertedMessage.data };
};
