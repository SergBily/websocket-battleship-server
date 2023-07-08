import { StructureMessage } from '../models/interfaces/structure-message.interface';

export const createSendMessage = (type: string, data: string): StructureMessage => (
  { type, data, id: 0 });
