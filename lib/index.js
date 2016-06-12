'use strict';

module.exports = function () {
  const trackers = [];
  let isFinished = false;
  let onFinished = () => {};

  function tryToFinish () {
    if (all(pluck(trackers, 'executed')) && !isFinished) {
      isFinished = true;
      onFinished(pluck(trackers, 'args'));
    }
  }

  return {
    track () {
      const thisIdx = trackers.push({executed: false}) - 1;
      return function () {
        trackers[thisIdx] = {executed: true, args: argsToArray(arguments)};
        tryToFinish();
      };
    },

    finished (callback) {
      onFinished = callback;
    }
  };
};

function pluck (collection, property) {
  return collection.map(item => item[property]);
}

function all (conditions) {
  for (const condition of conditions) {
    if (!condition) return false;
  }

  return true;
}

function argsToArray (argumentsObject) {
  return Array.prototype.slice.call(argumentsObject);
}
