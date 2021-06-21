const InputError = class extends Error {
  constructor(...args) {
    super(...args);
    this.type = "inputError";
  }
};

module.exports = InputError;
