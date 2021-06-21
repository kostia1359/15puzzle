const prompts = require("prompts");
const InputError = require("../helpers/InputError");
const { DIMENSION } = require("./../constants");
const { getAvailableMove } = require("./puzzleService");

const SEPARATOR = ",";

const isDimensionValueValid = (value) => {
  const isInteger = /^\d+$/.test(value);
  if (!isInteger) {
    return false;
  }

  return 0 <= Number(value) && Number(value) <= DIMENSION - 1;
};
const getValidation = (puzzle) => (textPosition) => {
  const position = textPosition.replace(/\s/g, "").split(SEPARATOR);

  if (position.length !== 2) {
    return "Input 2 numbers";
  }

  if (
    !isDimensionValueValid(position[0]) ||
    !isDimensionValueValid(position[1])
  ) {
    return `Numbers should be integers in range [1, ${DIMENSION}]`;
  }
  const row = Number(position[0]);
  const tile = Number(position[1]);

  if (!getAvailableMove(puzzle, [row, tile])) {
    return "You can not move selected tile. Please select another tile";
  }

  return true;
};

const promptToInputPosition = async (puzzle) => {
  const inputPositionQuestion = {
    type: "list",
    separator: SEPARATOR,
    name: "position",
    message:
      'Input row and column number of tile you want to replace with blank tile separated by space(e.g "0, 0" for top left corner)',
    validate: getValidation(puzzle),
  };

  return prompts(inputPositionQuestion)
    .then(({ position }) => ({
      row: Number(position[0]),
      tile: Number(position[1]),
    }))
    .catch((e) => {
      throw new InputError(e);
    });
};

module.exports = {
  promptToInputPosition,
  isDimensionValueValid,
  getValidation,
};
