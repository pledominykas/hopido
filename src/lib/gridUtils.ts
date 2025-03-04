interface Square {
  x: number;
  y: number;
  value: number | null;
  isCurrent: boolean;
  isValidMove: boolean;
}

interface Grid {
  size: number;
  squares: Square[][];
}

export const generateGrid = (size: number): Grid => {
  const squares = [];

  for (let x = 0; x < size; x++) {
    const row: Square[] = [];

    for (let y = 0; y < size; y++) {
      row.push({ value: null, x, y, isCurrent: false, isValidMove: true });
    }

    squares.push(row);
  }

  return {
    size,
    squares
  };
};

const getValidMoves = (grid: Grid): Grid => {
  const currentSquare = grid.squares.flat().find((s) => s.isCurrent);

  if (currentSquare === undefined) {
    return getModifiedGrid(grid, (square) => ({ ...square, isValidMove: true }));
  }

  return getModifiedGrid(grid, (square) => ({
    ...square,
    isValidMove: isValidMove(currentSquare, square)
  }));
};

const isValidMove = (currentSquare: Square, squareToCheck: Square): boolean => {
  if (squareToCheck.value !== null) {
    return false;
  }

  if (squareToCheck.y === currentSquare.y && Math.abs(squareToCheck.x - currentSquare.x) === 3) {
    return true;
  }

  if (squareToCheck.x === currentSquare.x && Math.abs(squareToCheck.y - currentSquare.y)) {
    return true;
  }

  if (
    Math.abs(squareToCheck.x - squareToCheck.x) === 2 &&
    Math.abs(squareToCheck.y - squareToCheck.x) === 2
  ) {
    return true;
  }

  return false;
};

const getModifiedGrid = (grid: Grid, modifier: (square: Square) => Square): Grid => {
  const squares: Square[][] = [];

  for (let y = 0; y < grid.size; y++) {
    const row: Square[] = [];

    for (let x = 0; x < grid.size; x++) {
      row.push(modifier(grid.squares[x][y]));
    }
  }

  return {
    size: grid.size,
    squares
  };
};
