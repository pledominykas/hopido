export enum SquareState {
  Current,
  ValidMove,
  None
}

export interface Square {
  x: number;
  y: number;
  value: number | null;
  state: SquareState;
}

export interface Grid {
  size: number;
  squares: Square[][];
}

export const generateGrid = (
  size: number,
  initialSquareState: SquareState = SquareState.ValidMove
): Grid => {
  const squares = [];

  for (let x = 0; x < size; x++) {
    const row: Square[] = [];

    for (let y = 0; y < size; y++) {
      row.push({ value: null, x, y, state: initialSquareState });
    }

    squares.push(row);
  }

  return {
    size,
    squares
  };
};

export const cloneGrid = (grid: Grid): Grid => {
  return {
    size: grid.size,
    squares: grid.squares.map((row) =>
      row.map((square) => ({
        ...square
      }))
    )
  };
};
