import { SquareState, type Grid, type Square } from './grid-utils';

export const VALID_MOVES = [
  { dx: 3, dy: 0 },
  { dx: -3, dy: 0 },
  { dx: 0, dy: 3 },
  { dx: 0, dy: -3 },
  { dx: 2, dy: 2 },
  { dx: 2, dy: -2 },
  { dx: -2, dy: 2 },
  { dx: -2, dy: -2 }
];

export const setCurrentSquare = (grid: Grid, currentSquare: Square, currentNumber: number) => {
  modifyGridSquares(grid, (square) => {
    if (isValidMove(currentSquare, square)) {
      square.state = SquareState.ValidMove;
    } else if (square.state !== SquareState.Unplayable) {
      square.state = SquareState.Empty;
    }
  });

  currentSquare.state = SquareState.Current;
  currentSquare.value = currentNumber;

  return grid;
};

export const getPossibleMovesFromSquare = (square: Square, grid: Grid): Square[] => {
  const nextMoveCoordinates = VALID_MOVES.map((move) => ({
    x: square.x + move.dx,
    y: square.y + move.dy
  })).filter((coord) => coord.x >= 0 && coord.x < grid.size && coord.y >= 0 && coord.y < grid.size);

  const nextMoveSquares = nextMoveCoordinates
    .map((coord) => grid.squares[coord.x][coord.y])
    .filter((square) => squareAllowsMovingTo(square));

  return nextMoveSquares;
};

const squareAllowsMovingTo = (square: Square) => {
  if (square.value !== null || square.state === SquareState.Unplayable) {
    return false;
  }

  return true;
};

const isValidMove = (currentSquare: Square, squareToCheck: Square) => {
  if (!squareAllowsMovingTo(squareToCheck)) {
    return false;
  }

  return VALID_MOVES.some(
    (move) =>
      currentSquare.x + move.dx === squareToCheck.x && currentSquare.y + move.dy === squareToCheck.y
  );
};

const modifyGridSquares = (grid: Grid, modifier: (square: Square) => void) => {
  for (let x = 0; x < grid.size; x++) {
    for (let y = 0; y < grid.size; y++) {
      modifier(grid.squares[x][y]);
    }
  }
};
