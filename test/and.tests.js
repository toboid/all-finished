'use strict';

const expect = require('chai').expect;
const And = require('../lib');

describe('and', function () {
  it('completes when two operands are executed', () => {
    let andComplete = false;

    const and = And();
    const operandA = and.do();
    const operandB = and.do();
    and.then(() => {
      andComplete = true;
    });

    expect(andComplete).to.eql(false);
    operandA();
    expect(andComplete).to.eql(false);
    operandB();
    expect(andComplete).to.eql(true);
  });

  it('completes when three operands are executed', () => {
    let andComplete = false;

    const and = And();
    const operandA = and.do();
    const operandB = and.do();
    const operandC = and.do();
    and.then(() => {
      andComplete = true;
    });

    expect(andComplete).to.eql(false);
    operandA();
    expect(andComplete).to.eql(false);
    operandB();
    expect(andComplete).to.eql(false);
    operandC();
    expect(andComplete).to.eql(true);
  });
});
