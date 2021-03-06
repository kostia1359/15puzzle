const { expect } = require("chai");
const { DIMENSION, BLANK_TILE_SYMBOL } = require("../../constants");
const arrayHelper = require("../../helpers/arrayHelper");
const shuffleService = require("../../services/shuffleService");
const puzzles = require("./puzzles.json");

describe("shuffleService", () => {
  describe("countInversions", () => {
    it("should count inversions correctly", () => {
      puzzles.forEach(({ puzzle, inversions }) => {
        expect(shuffleService.countInversions(puzzle)).to.be.equal(inversions);
      });
    });
  });
  describe("getBottomRowWithBlankSymbol", () => {
    it("should return number of row with blank symbol counting from the bottom", () => {
      puzzles.forEach(({ puzzle, blankRowPosition }) => {
        expect(shuffleService.getBottomRowWithBlankSymbol(puzzle)).to.be.equal(
          blankRowPosition
        );
      });
    });
  });
  describe("isPuzzleSolvable", () => {
    it("should return true if puzzle is solvable and false if puzzle is not solvable", () => {
      puzzles.forEach(({ puzzle, isSolvable }) => {
        expect(shuffleService.isPuzzleSolvable(puzzle)).to.be.equal(isSolvable);
      });
    });
  });
  describe("createSolvablePuzzle", () => {
    it("should create solvable puzzle", () => {
      for (let attempts = 0; attempts < 10; attempts++) {
        const puzzle = shuffleService.createSolvablePuzzle(4);
        try {
          expect(shuffleService.isPuzzleSolvable(puzzle)).to.be.equal(true);
        } catch (e) {
          throw e;
        }
      }
    });
    it(`should use all numbers in range [1, ${
      DIMENSION * DIMENSION - 1
    }] and ${BLANK_TILE_SYMBOL}`, () => {
      for (let attempts = 0; attempts < 10; attempts++) {
        const puzzle = shuffleService.createSolvablePuzzle(4);
        try {
          const flatPuzzle = puzzle.flat();
          const expectedFlatPuzzle = arrayHelper
            .createArrayFrom1ToN(DIMENSION * DIMENSION - 1)
            .concat(BLANK_TILE_SYMBOL);

          expect(flatPuzzle.sort()).to.be.deep.equal(expectedFlatPuzzle.sort());
        } catch (e) {
          console.log(puzzle);
          throw e;
        }
      }
    });
  });
});
