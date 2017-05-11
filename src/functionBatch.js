// @flow

import debounce from 'lodash/debounce';

type debounceOptions = {
  leading?: boolean,
  maxWait?: number,
  trailing?: boolean,
};

type Deferrable = {
  promise: Promise<*>,
  resolve: () => void,
  reject: () => void,
};

const defer = (): Deferrable => {
  let resolve;
  let reject;

  const promise = new Promise((rslv, rjct) => {
    resolve = rslv;
    reject = rjct;
  });

  return {
    promise,
    // $FlowFixMe
    resolve,
    // $FlowFixMe
    reject,
  };
};

const proxyFunction = (func: Function, wait: number, options: debounceOptions) => {
  let arrArg = [];
  let deferred = defer();

  const callThenResetArgs = (...args) => {
    try {
      const result = func(...args);
      // Resolves with either a data, or a promise.
      deferred.resolve(result);
    } catch (err) {
      deferred.reject(err);
    }

    arrArg = [];
    deferred = defer();
  };

  const debouncedFunc = debounce(callThenResetArgs, wait, options);

  return (arr: Array<*>, ...args: any): Promise<*> => {
    arrArg = arrArg.concat(arr);
    debouncedFunc(arrArg, ...args);
    return deferred.promise;
  };
};

export default proxyFunction;
