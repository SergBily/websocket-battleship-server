import WebSocket from 'ws';
import { jsonConverter } from '../utils/jsonConverter';
import { StructureMessage } from '../models/interfaces/structureMessage.interface';

export const decodedMessage = (message: WebSocket.RawData) => {
  const messageUtf8 = message.toString();
  const convertedMessage: StructureMessage = jsonConverter(messageUtf8);
  return { type: convertedMessage.type, payload: convertedMessage.data };
};
