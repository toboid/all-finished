'use strict';

const expect = require('chai').expect;
const createAnd = require('../lib');

describe('and', function () {
  it('calls back when both operands executed', () => {
    let andComplete = false;

    const and = createAnd(() => {
      andComplete = true;
    });

    expect(andComplete).to.eql(false);
    and[0]();
    expect(andComplete).to.eql(false);
    and[1]();
    expect(andComplete).to.eql(true);
  });
});
