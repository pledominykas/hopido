import Rand from 'rand-seed';
import { cloneGrid, generateGrid, SquareState, type Grid, type Square } from './grid-utils';
import { getPossibleMovesFromSquare } from './move-utils';

interface GeneratedLevel {
  solution: Grid;
  grid: Grid;
}

export const generateLevel = (seed: string, steps: number, gridSize: number): GeneratedLevel => {
  const random = new Rand(seed);
  const emptyGrid = generateGrid(gridSize, SquareState.Empty);

  const startSquare = getInitialMove(random, emptyGrid);

  const solvedGeneration = generate(startSquare, emptyGrid, 1, steps, random);

  if (solvedGeneration === null) {
    throw new Error('Failed to generate level');
  }

  const generatedGrid = cloneGrid(solvedGeneration);

  for (const row of generatedGrid.squares) {
    for (const square of row) {
      if (square.value === null) {
        square.state = SquareState.Unplayable;
      } else {
        square.value = null;
      }
    }
  }

  generatedGrid.squares[startSquare.x][startSquare.y].state = SquareState.ValidMove;

  return {
    solution: solvedGeneration,
    grid: generatedGrid
  };
};

const generate = (
  currentSquare: Square,
  grid: Grid,
  currentStep: number,
  maxSteps: number,
  random: Rand
): Grid | null => {
  grid.squares[currentSquare.x][currentSquare.y].value = currentStep;

  if (currentStep === maxSteps) {
    return grid;
  }

  const possibleMoves = getPossibleMovesFromSquare(currentSquare, grid);

  if (possibleMoves.length === 0) {
    return null;
  }

  const nextMove = possibleMoves[Math.floor(random.next() * possibleMoves.length)];

  const generation = generate(nextMove, grid, currentStep + 1, maxSteps, random);

  if (generation !== null) {
    return generation;
  }

  grid.squares[nextMove.x][nextMove.y].value = null;

  return null;
};

const getInitialMove = (random: Rand, grid: Grid): Square => {
  const startX = Math.floor(random.next() * grid.size);
  const startY = Math.floor(random.next() * grid.size);

  return grid.squares[startX][startY];
};
