const { expect } = require("chai");
const { DIMENSION } = require("../../constants");
const inputService = require("../../services/inputService");

describe("inputService", () => {
  describe("isDimensionValueValid", () => {
    it("should return true if dimension is a valid string", () => {
      expect(inputService.isDimensionValueValid("0")).to.be.equal(true);
      expect(
        inputService.isDimensionValueValid(`${DIMENSION - 1}`)
      ).to.be.equal(true);
    });
    it("should return false if dimension is not an integer number", () => {
      expect(inputService.isDimensionValueValid("1.")).to.be.equal(false);
      expect(inputService.isDimensionValueValid("1.2")).to.be.equal(false);
      expect(inputService.isDimensionValueValid("asd")).to.be.equal(false);
    });
    it(`should return false if dimension is not in range [1, ${DIMENSION}]`, () => {
      expect(inputService.isDimensionValueValid(DIMENSION + 1)).to.be.equal(
        false
      );
    });
  });

  describe("getValidation should return function that", () => {
    const rangeError = `Numbers should be integers in range [1, ${DIMENSION}]`;
    const typeError = "Input 2 numbers";
    const tileNotMovableError =
      "You can not move selected tile. Please select another tile";

    it(`should return "${typeError}" if input is not convertible to pair of integers`, () => {
      expect(inputService.getValidation([])("4")).to.be.equal(typeError);
      expect(inputService.getValidation([])("4, 1, 1")).to.be.equal(typeError);
    });
    it(`should return "${rangeError}" if at least one coordinate is not in range [1, ${DIMENSION}]`, () => {
      expect(inputService.getValidation([])(`${DIMENSION}, 1`)).to.be.equal(
        rangeError
      );
      expect(inputService.getValidation([])(`1, ${DIMENSION}`)).to.be.equal(
        rangeError
      );
      expect(
        inputService.getValidation([])(`${DIMENSION}, ${DIMENSION}`)
      ).to.be.equal(rangeError);
    });
    it(`should return ${tileNotMovableError} if chosen tile can not be moved`, () => {
      console.log(
        inputService.getValidation([
          ["", 1],
          [2, 3],
        ])("1, 1")
      );
      expect(
        inputService.getValidation([
          ["", 1],
          [2, 3],
        ])("2, 2")
      ).to.be.equal(tileNotMovableError);
    });
    it("should return true chosen tile is valid and can be moved", () => {
      expect(
        inputService.getValidation([
          ["", 1],
          [2, 3],
        ])("0, 1")
      ).to.be.equal(true);
    });
  });
});
