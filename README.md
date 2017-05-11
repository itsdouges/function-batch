# [function-batch](https://github.com/madou/function-batch)

[![NPM version](http://img.shields.io/npm/v/function-batch.svg?style=flat-square)](https://www.npmjs.com/package/function-batch)
[![NPM downloads](http://img.shields.io/npm/dm/function-batch.svg?style=flat-square)](https://www.npmjs.com/package/function-batch)
[![Build Status](http://img.shields.io/travis/madou/function-batch/master.svg?style=flat-square)](https://travis-ci.org/madou/function-batch)
[![codecov](https://codecov.io/gh/madou/function-batch/branch/master/graph/badge.svg)](https://codecov.io/gh/madou/function-batch)
[![Dependency Status](http://img.shields.io/david/madou/function-batch.svg?style=flat-square)](https://david-dm.org/madou/function-batch)

> Creates a batched function that will batch up all calls to it, and then after a threshold call the original function with all the args combined.

## How to Install

```sh
npm install function-batch
```

## Usage

```javascript
import functionBatch from 'function-batch';

const returnArr = (arr) => arr;
const returnArrBatched = functionBatch(returnArr);

const value = Promise.all([
  returnArrBatched([1]);
  returnArrBatched([2]);
  returnArrBatched([3]);
  returnArrBatched([4]);
])
.then(([a, b, c, d]) => {
// All resolve with the same value.
// a = [1, 2, 3, 4]
// b = [1, 2, 3, 4]
// c = [1, 2, 3, 4]
// d = [1, 2, 3, 4]
});
```

Currently `function-batch` only supports batching up arrays.
Support for different kinds of args will be added if requested!

## Api

### function: functionBatch(func, wait, options): Promise<*>

| param   | type     | required |
|---------|----------|----------|
| func    | Function | yes      |
| wait    | number   | yes      |
| options | Options  | no       |

### object: Options

| param    | type    | required |
|----------|---------|----------|
| leading  | boolean | no       |
| trailing | boolean | no       |
| maxWait  | number  | no       |
