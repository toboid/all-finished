'use strict';

function all (conditions) {
  for (const condition of conditions) {
    if (!condition) return false;
  }

  return true;
}

module.exports = function () {
  const satisfied = [];
  let isFinished = false;
  let finished = () => {};

  function tryToFinish () {
    if (all(satisfied) && !isFinished) {
      isFinished = true;
      finished();
    }
  }

  return {
    operand () {
      const thisIdx = satisfied.push(false) - 1;
      return () => {
        satisfied[thisIdx] = true;
        tryToFinish();
      };
    },

    done (callback) {
      finished = callback;
    }
  };
};
