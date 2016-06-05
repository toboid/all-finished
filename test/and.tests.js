'use strict';

const expect = require('chai').expect;
const And = require('../lib');

describe('and', function () {
  it('completes when two operands are executed', () => {
    let allDone = false;

    const and = And();
    const p1 = and.operand();
    const p2 = and.operand();
    and.done(() => {
      allDone = true;
    });

    expect(allDone).to.eql(false);
    p1();
    expect(allDone).to.eql(false);
    p2();
    expect(allDone).to.eql(true);
  });

  it('completes when three operands are executed', () => {
    let allDone = false;

    const and = And();
    const p1 = and.operand();
    const p2 = and.operand();
    const p3 = and.operand();
    and.done(() => {
      allDone = true;
    });

    expect(allDone).to.eql(false);
    p1();
    expect(allDone).to.eql(false);
    p2();
    expect(allDone).to.eql(false);
    p3();
    expect(allDone).to.eql(true);
  });
});
