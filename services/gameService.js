const puzzleService = require("./puzzleService");
const viewService = require("./viewService");
const InputError = require("../helpers/InputError");
const { promptToInputPosition } = require("./inputService");
const { createSolvablePuzzle } = require("./shuffleService");
const { DIMENSION } = require("../constants");

class GameService {
  constructor() {
    this.puzzle = createSolvablePuzzle(DIMENSION);
  }
  startGame() {
    viewService.renderPuzzle(this.puzzle);
    this.moveTile();
  }
  async moveTile() {
    try {
      const { row, tile } = await promptToInputPosition(this.puzzle);
      const move = puzzleService.getAvailableMove(this.puzzle, [row, tile]);

      this.puzzle = puzzleService.moveTile({
        position: [row, tile],
        puzzle: this.puzzle,
        move,
      });

      this.finishMove();
    } catch (e) {
      if (e instanceof InputError) {
        viewService.showInputError();
      } else {
        viewService.showInternalError(e);
      }
    }
  }
  finishMove() {
    viewService.renderPuzzle(this.puzzle);
    if (puzzleService.isPuzzleSolved(this.puzzle)) {
      return viewService.showWinMessage();
    }

    return this.moveTile();
  }
}

module.exports = GameService;
