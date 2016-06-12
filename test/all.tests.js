'use strict';

const expect = require('chai').expect;
const All = require('../lib');

describe('all', function () {
  it('finishes when one tracked function is executed', () => {
    let allFinished = false;

    const all = All();
    const p1 = all.track();
    all.finished(() => {
      allFinished = true;
    });

    expect(allFinished).to.eql(false);
    p1();
    expect(allFinished).to.eql(true);
  });

  it('finishes when three tracked functions are executed', () => {
    let allFinished = false;

    const all = All();
    const p1 = all.track();
    const p2 = all.track();
    const p3 = all.track();
    all.finished(() => {
      allFinished = true;
    });

    expect(allFinished).to.eql(false);
    p1();
    expect(allFinished).to.eql(false);
    p2();
    expect(allFinished).to.eql(false);
    p3();
    expect(allFinished).to.eql(true);
  });

  it('finishes when handler set between tracked function executions', () => {
    let allFinished = false;

    const all = All();
    const p1 = all.track();
    const p2 = all.track();

    expect(allFinished).to.eql(false);
    p1();
    all.finished(() => {
      allFinished = true;
    });
    expect(allFinished).to.eql(false);
    p2();
    expect(allFinished).to.eql(true);
  });

  it('finishes only once', () => {
    let alreadyCalled = false;

    const all = All();
    const p1 = all.track();
    all.finished(() => {
      if (alreadyCalled) {
        throw new Error('finished already called');
      }
      alreadyCalled = true;
    });

    p1();
    p1();
  });

  it('works with new keyword', () => {
    let allFinished = false;

    const all = new All();
    const p1 = all.track();
    all.finished(() => {
      allFinished = true;
    });

    expect(allFinished).to.eql(false);
    p1();
    expect(allFinished).to.eql(true);
  });

  it('does not require finish handler', () => {
    const all = new All();
    const p1 = all.track();
    p1();
  });

  it('handles parameters to the tracked functions');

  it('raises events when tracked functions are executed');
});
