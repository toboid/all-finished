'use strict';

const expect = require('chai').expect;
const AllFinished = require('../lib');

describe('all', function () {
  it('finishes when one tracked function is executed', () => {
    let allFinished = false;

    const all = AllFinished();
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

    const all = AllFinished();
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

    const all = AllFinished();
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

    const all = AllFinished();
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

    const all = new AllFinished();
    const p1 = all.track();
    all.finished(() => {
      allFinished = true;
    });

    expect(allFinished).to.eql(false);
    p1();
    expect(allFinished).to.eql(true);
  });

  it('does not require finished handler', () => {
    const all = new AllFinished();
    const p1 = all.track();
    p1();
  });

  it('aggregates tracked function parameters for finished handler', (done) => {
    const all = AllFinished();
    const p1 = all.track();
    const p2 = all.track();
    all.finished(({[0]: p1Args, [1]: p2Args}) => {
      expect(p1Args).to.eql(['Foo', [1]]);
      expect(p2Args).to.eql([{message: 'Bar'}, 2]);
      done();
    });
    p1('Foo', [1]);
    p2({message: 'Bar'}, 2);
  });

  it('raises events when tracked functions are executed');
});
