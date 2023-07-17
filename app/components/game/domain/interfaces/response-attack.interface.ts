import { Winners } from '../../../user/domain/interfaces/winners.interface';
import { PlayerGame } from './game-database.interface';

export interface ResponseAttack {
  playersGame: PlayerGame[] | undefined;
  status: string;
  winners: Winners[];
}
