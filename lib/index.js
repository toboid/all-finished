'use strict';

module.exports = function () {
  const tracked = [];
  let isFinished = false;
  let onFinished = () => {};

  function tryToFinish () {
    if (all(pluck(tracked, 'executed')) && !isFinished) {
      isFinished = true;
      onFinished(getArgs(tracked));
    }
  }

  return {
    track () {
      const thisIdx = tracked.push({executed: false}) - 1;
      return function () {
        tracked[thisIdx].executed = true;
        tracked[thisIdx].args = arguments;
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

function getArgs (tracked) {
  return pluck(tracked, 'args').map(argsToArray);
}

function argsToArray (argumentsObject) {
  return Array.prototype.slice.call(argumentsObject);
}
