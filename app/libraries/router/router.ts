import { typeOfMessage } from '../common/type-message';
import { KeysOfTypesMessages } from '../models/types/keys-interfaces';

export const router = (type: string, payload: string, idClient: number) => {
  try {
    const handlerMessage = typeOfMessage[type as KeysOfTypesMessages];
    handlerMessage(payload, idClient);
  } catch (error) {
    console.log(error);
  }
};
