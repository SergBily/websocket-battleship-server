import { PlayerGame } from './game-database.interface';

export interface ResponseAttack {
  playersGame: PlayerGame[] | undefined;
  status: string;
}
