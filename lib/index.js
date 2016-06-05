'use strict';

function all (conditions) {
  for (const condition of conditions) {
    if (!condition) return false;
  }

  return true;
}

module.exports = function () {
  const operands = [];
  const satisfiedOperands = [];
  // TODO: rename
  // TODO: does this need to be a noop initially? needs a test
  let _then = () => {};

  function complete () {
    if (all(satisfiedOperands)) {
      _then();
    }
  }

  return {
    do () {
      satisfiedOperands.push(false);
      const i = satisfiedOperands.length - 1;
      const operand = () => {
        satisfiedOperands[i] = true;
        complete();
      };
      operands.push(operand);
      return operand;
    },

    then (callback) {
      _then = callback;
    }
  };
};
