import { describe, test, expect } from 'vitest';
import { generateGrid } from './grid-utils';
import { setCurrentSquare } from './move-utils';
import { solveGrid } from './grid-solver';

describe('grid-solver', () => {
  test('should solve 10x10 grid from square (0,0)', () => {
    const grid = generateGrid(10);
    const currentSquare = grid.squares[0][0];

    setCurrentSquare(grid, currentSquare, 1);

    const solution = solveGrid(currentSquare, grid);

    expect(solution.exists).toBe(true);
  });
});
