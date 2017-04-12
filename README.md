# [function-batch](https://github.com/madou/function-batch)

[![NPM version](http://img.shields.io/npm/v/function-batch.svg?style=flat-square)](https://www.npmjs.com/package/function-batch)
[![NPM downloads](http://img.shields.io/npm/dm/function-batch.svg?style=flat-square)](https://www.npmjs.com/package/function-batch)
[![Build Status](http://img.shields.io/travis/madou/function-batch/master.svg?style=flat-square)](https://travis-ci.org/madou/function-batch)
[![Coverage Status](https://img.shields.io/coveralls/madou/function-batch.svg?style=flat-square)](https://coveralls.io/madou/function-batch)
[![Dependency Status](http://img.shields.io/david/madou/function-batch.svg?style=flat-square)](https://david-dm.org/madou/function-batch)

> Creates a batched function that will batch up all calls to it, and then after a threshold call the original function with all the args combined.

## How to Install

Using either npm or yarn:

```sh
npm install function-batch
yarn add function-batch
```

## Usage

```javascript
import createBatchedFunction from 'function-batch';

const function = (arr) => console.log(arr);
const batchedFunction = createBatchedFunction(function);

batchedFunction([1]);
batchedFunction([2]);
batchedFunction([3]);
batchedFunction([4]);

// [1, 2, 3, 4]
```

Currently `function-batch` only supports batching up arrays.
Support for different kinds of args will be added if requested!

### Options

`function-batch` takes an optional `options` object, exactly the
same as `debounce` from `lodash` takes.

```javascript
const options = {
  leading?: false,
  maxWait?: 500,
  trailing?: true,
};

const func = createBatchedFunction(function, options);
```
