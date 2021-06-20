const arrayHelper = {
  removeLast: (items) => items.slice(0, -1),
  createArrayFrom1ToN: (n) => {
    let arr = [];

    for (let i = 1; i < n + 1; i++) {
      arr.push(i);
    }

    return arr;
  },
  shuffle: (items) => items.sort(() => Math.random() - 0.5),
};

module.exports = arrayHelper;
