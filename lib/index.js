'use strict';

module.exports = function () {
  const state = createInitialState();

  return {
    track () {
      const thisIdx = state.trackers.push({executed: false}) - 1;

      return function () {
        state.trackers[thisIdx] = {executed: true, args: argsToArray(arguments)};
        tryToFinish(state);
      };
    },

    finished (callback) {
      state.onFinished = callback;
    }
  };
};

function createInitialState () {
  return {
    trackers: [],
    isFinished: false,
    onFinished: () => {}
  };
}

function tryToFinish (state) {
  if (all(pluck(state.trackers, 'executed')) && !state.isFinished) {
    state.isFinished = true;
    state.onFinished(pluck(state.trackers, 'args'));
  }
}

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
