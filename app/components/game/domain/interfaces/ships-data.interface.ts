export interface ShipsData {
  gameId: number;
  ships: Ships[];
}

export interface Ships {
  position: Position;
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

interface Position {
  x: number;
  y: number
}
