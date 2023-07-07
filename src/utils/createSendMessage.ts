import { StructureMessage } from '../models/interfaces/structureMessage.interface';

export const createSendMessage = (type: string, data: string): StructureMessage => (
  { type, data, id: 0 });
