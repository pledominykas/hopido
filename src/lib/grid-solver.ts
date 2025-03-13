import { assert } from 'vitest';
import { cloneGrid, type Grid, type Square } from './grid-utils';
import { squareAllowsMovingTo, VALID_MOVES } from './move-utils';

interface GridSolution {
  exists: boolean;
  solvedGrid: Grid | undefined;
}

const countValidSquares = (grid: Grid): number => {
  return grid.squares.flat().reduce<number>((sum) => {
    //TODO: if(squareIsNotBlocked)
    sum += 1;

    return sum;
  }, 0);
};

const getPossibleMovesFromSquare = (square: Square, grid: Grid): Square[] => {
  const nextMoveCoordinates = VALID_MOVES.map((move) => ({
    x: square.x + move.dx,
    y: square.y + move.dy
  })).filter((coord) => coord.x >= 0 && coord.x < grid.size && coord.y >= 0 && coord.y < grid.size);

  const nextMoveSquares = nextMoveCoordinates
    .map((coord) => grid.squares[coord.x][coord.y])
    .filter((square) => squareAllowsMovingTo(square));

  return nextMoveSquares;
};

const solve = (currentSquare: Square, grid: Grid, lastNumber: number): GridSolution => {
  assert(
    currentSquare.value !== null,
    'Current square value cannot be null. Check if value is updated before calling solve.'
  );

  const currentPossibleMoves = getPossibleMovesFromSquare(currentSquare, grid);

  const nextPossibleMoves = currentPossibleMoves.map((currentPossibleMove) => {
    assert(currentSquare.value !== null);

    const gridWithMadeMove = cloneGrid(grid);
    gridWithMadeMove.squares[currentPossibleMove.x][currentPossibleMove.y].value =
      currentSquare.value + 1;

    return {
      square: currentPossibleMove,
      possibleMoves: getPossibleMovesFromSquare(currentPossibleMove, grid)
    };
  });

  // Warnsdorff's Rule: We want to explore the moves that lead to the least next possible moves first
  const possibleMovesByDegree = nextPossibleMoves.sort(
    (a, b) => a.possibleMoves.length - b.possibleMoves.length
  );

  for (const move of possibleMovesByDegree) {
    move.square.value = currentSquare.value + 1;

    if (move.square.value === lastNumber) {
      return {
        exists: true,
        solvedGrid: grid
      };
    }

    const solution = solve(move.square, grid, lastNumber);

    if (solution.exists) {
      return solution;
    }
  }

  currentSquare.value = null;

  return {
    exists: false,
    solvedGrid: undefined
  };
};

export const solveGrid = (startingSquare: Square, grid: Grid): GridSolution => {
  const gridClone = cloneGrid(grid);
  const lastNumber = countValidSquares(gridClone);

  return solve(startingSquare, gridClone, lastNumber);
};
