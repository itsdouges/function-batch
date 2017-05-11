import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import ddebounce from 'lodash/debounce';

const debounce = sinon.spy();

const { default: functionBatch } = proxyquire('../src', {
  'lodash/debounce': (...args) => debounce(...args) || ddebounce(...args),
});

describe('function proxy', () => {
  const debounceTime = 50;
  const func = sinon.stub();


  let wrappedFunction;
  let clock;

  beforeEach(() => {
    func.reset();
  });

  before(() => {
    wrappedFunction = functionBatch(func, debounceTime);
    clock = sinon.useFakeTimers();
  });

  after(() => {
    func.reset();
    clock.restore();
  });

  const forwardTime = () => clock.tick(debounceTime);

  it('should batch up calls', () => {
    const extraArgs = ['cool', 'neat', () => {}];

    wrappedFunction([1, 2], ...extraArgs);
    wrappedFunction([3, 4], ...extraArgs);
    wrappedFunction([5, 6], ...extraArgs);

    forwardTime();

    expect(func).to.have.been.calledOnce;
    expect(func).to.have.been.calledWith([1, 2, 3, 4, 5, 6], ...extraArgs);
  });

  it('should reset saved after calling', () => {
    wrappedFunction([1]);

    forwardTime();
    func.reset();

    wrappedFunction([2]);
    forwardTime();

    expect(func).to.have.been.calledWith([2]);
  });

  it('should resolve when the func is called', async () => {
    const data = 'hello';
    func.withArgs([2]).returns(data);

    const promise = wrappedFunction([2]);
    forwardTime();

    const actual = await promise;

    expect(actual).to.equal(data);
  });

  it('should resolve the same promise for multiple calls', async () => {
    const data = 'goodbye';
    func.withArgs([2, 9]).returns(data);

    const promiseOne = wrappedFunction([2]);
    const promiseTwo = wrappedFunction([9]);
    forwardTime();

    const actual = await Promise.all([promiseOne, promiseTwo]);

    expect(actual).to.eql([data, data]);
  });

  it('should catch sync errors', async (done) => {
    const error = new Error('oh no!');
    func.withArgs([69]).throws(error);

    const promise = wrappedFunction([69]);
    forwardTime();

    try {
      await promise;
    } catch (err) {
      expect(err).to.eql(error);
      done();
    }
  });

  context('when func returns a promise', () => {
    it('should catch async errors', async (done) => {
      const error = new Error('ahhh no!');
      func.withArgs([33]).returns(Promise.reject(error));

      const promise = wrappedFunction([33]);
      forwardTime();

      try {
        await promise;
      } catch (err) {
        expect(err).to.eql(error);
        done();
      }
    });

    it('should resolve async data', () => {
      const data = 'konichiwa';
      func.withArgs([2]).returns(Promise.resolve(data));

      const promise = wrappedFunction([2]);
      forwardTime();

      return promise.then((actual) => {
        expect(actual).to.equal(data);
      });
    });
  });
});
