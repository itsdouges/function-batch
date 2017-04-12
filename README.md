# [function-batch](https://github.com/madou/function-batch)

[![NPM version](http://img.shields.io/npm/v/function-batch.svg?style=flat-square)](https://www.npmjs.com/package/function-batch)
[![NPM downloads](http://img.shields.io/npm/dm/function-batch.svg?style=flat-square)](https://www.npmjs.com/package/function-batch)
[![Build Status](http://img.shields.io/travis/madou/function-batch/master.svg?style=flat-square)](https://travis-ci.org/madou/function-batch)
[![codecov](https://codecov.io/gh/madou/function-batch/branch/master/graph/badge.svg)](https://codecov.io/gh/madou/function-batch)
[![Dependency Status](http://img.shields.io/david/madou/function-batch.svg?style=flat-square)](https://david-dm.org/madou/function-batch)

> Creates a batched function that will batch up all calls to it, and then after a threshold call the original function with all the args combined.

## How to Install

Using either npm:

```sh
npm install function-batch
```

Or yarn:

```sh
yarn add function-batch
```

## Usage

```javascript
import makeBatchCreator from 'function-batch';

const logArr = (arr) => console.log(arr);
const createBatchedFunction = makeBatchCreator(200);
const logArrBatched = createBatchedFunction(logArr);

logArrBatched([1]);
logArrBatched([2]);
logArrBatched([3]);
logArrBatched([4]);

// [1, 2, 3, 4]
```


Currently `function-batch` only supports batching up arrays.
Support for different kinds of args will be added if requested!

## Api

```javascript
type CreateBatchedFunction = function createBatchedFunction(Function);
type Options = {
  leading?: boolean,
  trailing?: boolean,
  maxWait?: number,
};

function makeBatchCreator(wait: number, options: Options): CreateBatchedFunction;
```
