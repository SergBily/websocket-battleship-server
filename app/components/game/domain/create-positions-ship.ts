import { CoordinateShips } from './interfaces/coordinate-ship.interface';
import { Ships } from './interfaces/ships-data.interface';
import { Axis } from './types/axis.type';

const fillPositions = (ship: Ships, type: string, axis: string): number[] => {
  if (type === 'add') {
    return Array.from({ length: ship.length }, (_v, index) => (index === 0
      ? ship.position[axis as Axis]
      : ship.position[axis as Axis] + index));
  }
  return Array.from({ length: ship.length }, (_v) => ship.position[axis as Axis]);
};

export const createPositionsShip = (ships: Ships[]): Record <string, CoordinateShips> => {
  const filledPositionsShips: Record <string, CoordinateShips> = {
    0: {
      openPosition: [],
      closePosition: [],
    },
  };
  // for (const ship of ships) {
  //   if (ship.direction) {
  //     const y = fillPositions(ship, 'add', 'y');
  //     const x = fillPositions(ship, '', 'x');
  //     filledPositionsShips.closePosition.push({ x, y });
  //   } else {
  //     const y = fillPositions(ship, '', 'y');
  //     const x = fillPositions(ship, 'add', 'x');
  //     filledPositionsShips.closePosition.push({ x, y });
  //   }
  // }

  for (const [index, ship] of ships.entries()) {
    if (ship.direction) {
      const y = fillPositions(ship, 'add', 'y');
      const x = fillPositions(ship, '', 'x');
      const bb: CoordinateShips | undefined = filledPositionsShips[index];
      // eslint-disable-next-line @typescript-eslint/dot-notation
      bb['closePosition'].push({ x, y });
    } else {
      const y = fillPositions(ship, '', 'y');
      const x = fillPositions(ship, 'add', 'x');
      const bb: CoordinateShips | undefined = filledPositionsShips[index];
      // eslint-disable-next-line @typescript-eslint/dot-notation
      bb['closePosition'].push({ x, y });
    }
  }
  return filledPositionsShips;
};
