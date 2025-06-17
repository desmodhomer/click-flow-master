
import { Move } from "./types";

export const generatePossibleMoves = (): Move[] => {
  const moves: Move[] = [];
  for (let axis of ['x', 'y', 'z']) {
    for (let layer of [-1, 0, 1]) {
      for (let direction of [1, -1]) {
        moves.push({ axis, layer, direction });
      }
    }
  }
  return moves;
};

export const selectNextMove = (
  possibleMoves: Move[],
  lastMoveAxis: string | null
): Move => {
  const availableMoves = possibleMoves.filter(
    (move) => move.axis !== lastMoveAxis
  );
  
  const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  const rotationAngle = Math.PI / 2;
        
  return { ...move, rotationAngle };
};
