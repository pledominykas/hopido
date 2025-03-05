import { generateGrid, setValidMoves } from './gridUtils';

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

export interface GameState {
  currentNumber: number;
  grid: Grid;
}

export const gameState: GameState = $state({
  currentNumber: 1,
  grid: generateGrid(10)
});

export const handleSquareClicked = (square: Square) => {
  if (square.state != SquareState.ValidMove) {
    return;
  }

  setValidMoves(gameState.grid, square);

  square.state = SquareState.Current;
  square.value = gameState.currentNumber;
  gameState.currentNumber++;
};
