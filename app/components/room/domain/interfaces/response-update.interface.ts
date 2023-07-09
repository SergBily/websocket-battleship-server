import { Room } from './room.interface';

export interface ResponseUpdate {
  type: string;
  data: Room[];
  id: number;
}
