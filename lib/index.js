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
  let onFinished = () => {};

  function tryToFinish () {
    if (all(satisfied) && !isFinished) {
      isFinished = true;
      onFinished();
    }
  }

  return {
    track () {
      const thisIdx = satisfied.push(false) - 1;
      return () => {
        satisfied[thisIdx] = true;
        tryToFinish();
      };
    },

    finished (callback) {
      onFinished = callback;
    }
  };
};
