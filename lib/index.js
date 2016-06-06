'use strict';

function all (conditions) {
  for (const condition of conditions) {
    if (!condition) return false;
  }

  return true;
}

module.exports = function () {
  const satisfied = [];
  // TODO: does this need to be a noop initially? needs a test
  let finished = () => {};

  function tryToFinish () {
    if (all(satisfied)) {
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
