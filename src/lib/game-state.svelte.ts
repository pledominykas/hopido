import { solveGrid } from './grid-solver';
import { cloneGrid, generateGrid, SquareState, type Grid, type Square } from './grid-utils';
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

export const handleUndoToSolutionClicked = () => {
  console.log('undo');
  const undoGrid = cloneGrid(gameState.grid);

  for (let currentNumber = gameState.currentNumber; currentNumber > 0; currentNumber--) {
    console.log('undo', currentNumber);
    const currentSquare = undoGrid.squares.flat().find((s) => s.value === currentNumber);

    if (currentSquare === undefined) {
      throw new Error(
        `Square '${currentNumber.toString()}' not found in grid when attempting undo.`
      );
    }

    const solution = solveGrid(currentSquare, undoGrid);

    if (solution.exists) {
      gameState.grid = undoGrid;
      gameState.currentNumber = currentNumber;
      // setCurrentSquare(gameState.grid, currentSquare, currentNumber);
      break;
    }

    currentSquare.value = null;
  }
};
