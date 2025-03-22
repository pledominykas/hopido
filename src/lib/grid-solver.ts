import { cloneGrid, type Grid, type Square } from './grid-utils';
import { getPossibleMovesFromSquare } from './move-utils';

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

//TODO: move inside solveGrid to not pass everything in arguments
const solve = (
  currentSquare: Square,
  grid: Grid,
  lastNumber: number,
  searchInfo: {
    currentSearchChecks: number;
    maxSearchChecks: number;
  }
): GridSolution => {
  if (currentSquare.value === null) {
    throw new Error(
      'Current square value cannot be null. Check if value is updated before calling solve.'
    );
  }

  searchInfo.currentSearchChecks += 1;
  console.log(searchInfo.currentSearchChecks);
  if (searchInfo.currentSearchChecks >= searchInfo.maxSearchChecks) {
    return {
      exists: false,
      solvedGrid: undefined
    };
  }

  const currentPossibleMoves = getPossibleMovesFromSquare(currentSquare, grid);

  const nextPossibleMoves = currentPossibleMoves.map((currentPossibleMove) => {
    if (currentSquare.value === null) {
      throw new Error(
        'Current square value cannot be null. Check if value is updated before calling solve.'
      );
    }

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

    const solution = solve(move.square, grid, lastNumber, searchInfo);

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

//TODO: add max depth to not get stuck solving for a long time
export const solveGrid = (
  startingSquare: Square,
  grid: Grid,
  maxSearchChecks = 10000
): GridSolution => {
  const gridClone = cloneGrid(grid);
  const lastNumber = countValidSquares(gridClone);

  return solve(startingSquare, gridClone, lastNumber, {
    currentSearchChecks: 0,
    maxSearchChecks: maxSearchChecks
  });
};
