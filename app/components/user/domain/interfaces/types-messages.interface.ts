import { WebSocket } from 'ws';

export interface TypesMessages {
  reg: (data: string, ws: WebSocket) => void
}
