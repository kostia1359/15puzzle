const arrayHelper = require("./../helpers/arrayHelper");
const _ = require("lodash");

const { BLANK_TILE_SYMBOL } = require("./../constants");

const isPuzzleSolved = (puzzle) => {
  const flatMatrix = puzzle.flat();

  const isLastElementCorrect = _.last(flatMatrix) === BLANK_TILE_SYMBOL;
  if (!isLastElementCorrect) {
    return false;
  }

  const filledTiles = arrayHelper.removeLast(flatMatrix);
  const sortedTiles = filledTiles.sort(
    (firstTile, secondTile) => firstTile - secondTile
  );

  return _.isEqual(arrayHelper.removeLast(flatMatrix), sortedTiles);
};

const getAvailableMove = (puzzle, [row, tile]) => {
  const availableMoves = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  return availableMoves.reduce((availableMove, move) => {
    if (availableMove) {
      return availableMove;
    }

    const neighborValue = _.get(
      puzzle,
      `[${row + move[0]}][${tile + move[1]}]`
    );
    return neighborValue === BLANK_TILE_SYMBOL ? move : null;
  }, null);
};

const moveTile = ({ puzzle, position, move }) => {
  const tileValue = puzzle[position[0]][position[1]];
  const tilePosition = [position[0] + move[0], position[1] + move[1]];

  const copiedPuzzle = _.cloneDeep(puzzle);

  copiedPuzzle[tilePosition[0]][tilePosition[1]] = tileValue;
  copiedPuzzle[position[0]][position[1]] = BLANK_TILE_SYMBOL;
  return copiedPuzzle;
};

module.exports = {
  isPuzzleSolved,
  getAvailableMove,
  moveTile,
};
