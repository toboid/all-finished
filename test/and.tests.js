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

  it('supports specified number of operands', () => {
    let andComplete = false;

    const operands = createAnd({operands: 5}, () => {
      andComplete = true;
    });

    expect(operands.length).to.eql(5);

    operands.forEach((operand) => {
      expect(andComplete).to.eql(false);
      operand();
    });
    expect(andComplete).to.eql(true);
  });
});
