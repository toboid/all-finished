'use strict';

const expect = require('chai').expect;
const createAnd = require('../lib');

describe('and', function () {
  it('calls back when both operands executed', () => {
    let andComplete = false;

    const [operandA, operandB] = createAnd(() => {
      andComplete = true;
    });

    expect(andComplete).to.eql(false);
    operandA();
    expect(andComplete).to.eql(false);
    operandB();
    expect(andComplete).to.eql(true);
  });
});
