import { typeOfMessage } from '../common/typeOfMessage';
import { KeysOfTypesMessages } from '../models/types/keysOfInterfaces';

export const router = (type: string, payload: string) => {
  const handlerMessage = typeOfMessage[type as KeysOfTypesMessages];
  handlerMessage(payload);
};
