const arrayHelper = require("../helpers/arrayHelper");
const { BLANK_TILE_SYMBOL } = require("./../constants");
const { isPuzzleSolved } = require("./puzzleService");

const countInversions = (puzzle) => {
  const flatPuzzle = puzzle.flat();
  let inversions = 0;

  for (
    let checkingTileIndex = 0;
    checkingTileIndex < flatPuzzle.length - 1;
    ++checkingTileIndex
  ) {
    for (
      let nextTileIndex = checkingTileIndex + 1;
      nextTileIndex < flatPuzzle.length;
      ++nextTileIndex
    ) {
      if (
        flatPuzzle[checkingTileIndex] &&
        flatPuzzle[nextTileIndex] &&
        flatPuzzle[checkingTileIndex] > flatPuzzle[nextTileIndex]
      ) {
        inversions++;
      }
    }
  }

  return inversions;
};

const getBottomRowWithBlankSymbol = (puzzle) => {
  const dimension = puzzle.length;
  for (let rowIndex = dimension - 1; rowIndex >= 0; --rowIndex) {
    const row = puzzle[rowIndex];
    if (row.includes(BLANK_TILE_SYMBOL)) {
      return dimension - rowIndex;
    }
  }
};

const createRandomPuzzle = (dimension) => {
  const flatMatrix = arrayHelper.shuffle(
    arrayHelper
      .createArrayFrom1ToN(dimension * dimension - 1)
      .concat(BLANK_TILE_SYMBOL)
  );

  const matrix = [];
  for (let rowIndex = 0; rowIndex < dimension; ++rowIndex) {
    matrix.push(
      flatMatrix.slice(rowIndex * dimension, (rowIndex + 1) * dimension)
    );
  }

  return matrix;
};

const isPuzzleSolvable = (puzzle) => {
  const rowPosition = getBottomRowWithBlankSymbol(puzzle);
  const inversions = countInversions(puzzle);

  return rowPosition % 2 !== inversions % 2;
};

const createSolvablePuzzle = (dimension) => {
  const swap = (puzzle, [x1, y1], [x2, y2]) =>
    ([puzzle[x1][y1], puzzle[x2][y2]] = [puzzle[x1][y2], puzzle[x2][y1]]);

  const puzzle = createRandomPuzzle(dimension);

  if (isPuzzleSolvable(puzzle)) {
    if (isPuzzleSolved(puzzle)) {
      return createSolvablePuzzle(dimension);
    }
    return puzzle;
  }

  if (
    puzzle[0][0] === BLANK_TILE_SYMBOL ||
    puzzle[0][1] === BLANK_TILE_SYMBOL
  ) {
    swap(puzzle, [1, 0], [1, 1]);
  } else {
    swap(puzzle, [0, 0], [0, 1]);
  }

  if (isPuzzleSolved(puzzle)) {
    return createSolvablePuzzle(dimension);
  }
  return puzzle;
};

module.exports = {
  countInversions,
  getBottomRowWithBlankSymbol,
  isPuzzleSolvable,
  createSolvablePuzzle,
};
