import { SquareState, type Grid, type Square } from './game-state.svelte';

export const generateGrid = (size: number): Grid => {
  const squares = [];

  for (let x = 0; x < size; x++) {
    const row: Square[] = [];

    for (let y = 0; y < size; y++) {
      row.push({ value: null, x, y, state: SquareState.ValidMove });
    }

    squares.push(row);
  }

  return {
    size,
    squares
  };
};

export const setValidMoves = (grid: Grid, currentSquare: Square) => {
  if (currentSquare === undefined) {
    return modifyGridSquares(grid, (square) => (square.state = SquareState.ValidMove));
  }

  return modifyGridSquares(grid, (square) => {
    if (isValidMove(currentSquare, square)) {
      square.state = SquareState.ValidMove;
    } else {
      square.state = SquareState.None;
    }
  });
};

const isValidMove = (currentSquare: Square, squareToCheck: Square): boolean => {
  if (squareToCheck.value !== null) {
    return false;
  }

  if (squareToCheck.y === currentSquare.y && Math.abs(squareToCheck.x - currentSquare.x) === 3) {
    return true;
  }

  if (squareToCheck.x === currentSquare.x && Math.abs(squareToCheck.y - currentSquare.y) === 3) {
    return true;
  }

  if (
    Math.abs(squareToCheck.x - currentSquare.x) === 2 &&
    Math.abs(squareToCheck.y - currentSquare.y) === 2
  ) {
    return true;
  }

  return false;
};

const modifyGridSquares = (grid: Grid, modifier: (square: Square) => void) => {
  for (let x = 0; x < grid.size; x++) {
    for (let y = 0; y < grid.size; y++) {
      modifier(grid.squares[x][y]);
    }
  }
};
