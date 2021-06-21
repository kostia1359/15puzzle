const renderPuzzle = (puzzle) => {
  console.clear();
  console.table(puzzle);
};

const showWinMessage = () =>
  console.log("Congratulations! You have solved the puzzle");

const showInternalError = (error) => {
  console.log("Game ended with an error");
  console.error(error);
};

const showInputError = () =>
  console.log("Probably, game was forcefully closed");

module.exports = {
  renderPuzzle,
  showWinMessage,
  showInternalError,
  showInputError,
};
