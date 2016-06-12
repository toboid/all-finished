'use strict';

module.exports = function () {
  const trackers = [];
  let isFinished = false;
  let onFinished = () => {};

  function tryToFinish () {
    if (all(pluck(trackers, 'executed')) && !isFinished) {
      isFinished = true;
      onFinished(getArgs(trackers));
    }
  }

  return {
    track () {
      const thisIdx = trackers.push({executed: false}) - 1;
      return function () {
        trackers[thisIdx] = {executed: true, args: arguments};
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

function getArgs (trackers) {
  return pluck(trackers, 'args').map(argsToArray);
}

function argsToArray (argumentsObject) {
  return Array.prototype.slice.call(argumentsObject);
}
