'use strict';

module.exports = function (next) {
  let satisfiedA = false;
  let satisfiedB = false;

  function complete () {
    if (satisfiedA && satisfiedB) {
      next();
    }
  }

  return [() => {
    satisfiedA = true;
    complete();
  }, () => {
    satisfiedB = true;
    complete();
  }];
};
