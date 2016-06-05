'use strict';

function all (conditions) {
  for (const condition of conditions) {
    if (!condition) return false;
  }

  return true;
}

module.exports = function () {
  const operands = [];
  const satisfied = [];
  // TODO: does this need to be a noop initially? needs a test
  let finished = () => {};

  function satisfy () {
    if (all(satisfied)) {
      finished();
    }
  }

  return {
    operand () {
      const thisIdx = satisfied.push(false) - 1;
      const newOperand = () => {
        satisfied[thisIdx] = true;
        satisfy();
      };
      operands.push(newOperand);
      return newOperand;
    },

    done (callback) {
      finished = callback;
    }
  };
};
