const { expect } = require("chai");
const puzzleService = require("../../services/puzzleService");
const _ = require("lodash");

describe("puzzleService", () => {
  describe("isPuzzleSolved", () => {
    it("should return true if puzzle is solved", () => {
      const solvedPuzzle = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, ""],
      ];

      expect(puzzleService.isPuzzleSolved(solvedPuzzle)).to.be.equal(true);
    });
    it("should return false if puzzle is not solved", () => {
      const notSolvedPuzzles = require("./notSolvedPuzzles.json");

      expect(
        notSolvedPuzzles.every(
          (sample) => puzzleService.isPuzzleSolved(sample) === false
        )
      ).to.be.equal(true);
    });
  });

  describe("getAvailableMove", () => {
    const puzzles = require("./availableMoves.json");

    const iterateOverPuzzle = (puzzle, iteratee) => {
      for (let row = 0; row < puzzle.length; ++row) {
        for (let tile = 0; tile < puzzle[row].length; ++tile) {
          iteratee(row, tile);
        }
      }
    };

    const getMove = (movableTiles, [row, tile]) => {
      const tileData = movableTiles.find(({ position }) =>
        _.isEqual(position, [row, tile])
      );
      if (!tileData) {
        return null;
      }

      return tileData.move;
    };

    it("should return move if tile can be moved", () => {
      puzzles.forEach(({ movableTiles, puzzle }) => {
        iterateOverPuzzle(puzzle, (row, tile) => {
          const availableMove = getMove(movableTiles, [row, tile]);
          if (!availableMove) {
            return;
          }

          expect(
            puzzleService.getAvailableMove(puzzle, [row, tile])
          ).to.be.deep.equal(availableMove);
        });
      });
    });

    it("should return null if tile can be moved", () => {
      puzzles.forEach(({ movableTiles, puzzle }) => {
        iterateOverPuzzle(puzzle, (row, tile) => {
          const availableMove = getMove(movableTiles, [row, tile]);
          if (availableMove) {
            return;
          }

          expect(
            puzzleService.getAvailableMove(puzzle, [row, tile])
          ).to.be.equal(null);
        });
      });
    });
  });
  describe("moveTile", () => {
    it("should replace blank space and tile with given position", () => {
      const { puzzle, results } = require("./moves.json");

      results.forEach(({ position, result }) => {
        expect(
          puzzleService.moveTile({
            puzzle,
            position,
            move: puzzleService.getAvailableMove(puzzle, position),
          })
        ).to.be.deep.equal(result);
      });
    });
  });
});
