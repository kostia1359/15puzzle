const shuffleService = require("./services/shuffleService");
const matrix = [
  [1, "", 9, 2],
  [8, 6, 16, 3],
  [4, 5, 7, 11],
  [10, 15, 14, 12],
];
console.log(shuffleService.isPuzzleSolvable(matrix));
