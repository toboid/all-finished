'use strict';

function isFunction (object) {
  return typeof object === 'function';
}

function configureArgs (construct) {
  return function (options, next) {
    if (isFunction(options)) {
      next = options;
      options = {operands: 2};
    }

    return construct(options, next);
  };
}

function all (conditions) {
  for (const condition of conditions) {
    if (!condition) return false;
  }

  return true;
}

function range (count) {
  return Array(count).fill(undefined).map((value, idx) => idx);
}

module.exports = configureArgs(function (options, next) {
  const operands = range(options.operands);
  const satisfiedFlags = operands.map(() => false);

  function complete () {
    if (all(satisfiedFlags)) {
      next();
    }
  }

  return operands.map((i) => {
    return () => {
      satisfiedFlags[i] = true;
      complete();
    };
  });
});
