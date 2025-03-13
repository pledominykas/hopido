import { generateGrid, SquareState, type Grid, type Square } from './grid-utils';
import { setCurrentSquare } from './move-utils';

export interface GameState {
  currentNumber: number;
  grid: Grid;
}

export const gameState: GameState = $state({
  currentNumber: 0,
  grid: generateGrid(10)
});

export const handleSquareClicked = (square: Square) => {
  if (square.state !== SquareState.ValidMove) {
    return;
  }

  setCurrentSquare(gameState.grid, square, gameState.currentNumber + 1);

  gameState.currentNumber += 1;
};
