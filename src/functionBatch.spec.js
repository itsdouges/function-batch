/**
 * function-batch
 *
 * Copyright © 2016 Michael Dougall. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import ddebounce from 'lodash.debounce';

const debounce = sinon.spy();

const { default: functionBatch } = proxyquire('../src/functionBatch', {
  'lodash/debounce': (...args) => debounce(...args) || ddebounce(...args),
});

describe('function proxy', () => {
  const debounceTime = 50;
  const func = sinon.spy();

  let wrappedFunction;
  let clock;

  before(() => {
    wrappedFunction = functionBatch(debounceTime)(func);
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
});
