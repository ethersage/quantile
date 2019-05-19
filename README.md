# quantile

[![CircleCI](https://circleci.com/gh/ethersage/quantile.svg?style=svg)](https://circleci.com/gh/ethersage/quantile)

#### This is currently under active development, but stable

Calculates [quantiles](https://en.wikipedia.org/wiki/Quantile) and the corresponding buckets. An n-quantile is a set of n - 1 numbers representing the values that compose the n - 1 boundries of evenly bucketing the original set. For example, the 2-quantile of input = [1, 2, 3] is [2] found by trying to evenly divide the input into 2 buckets of numbers and calculating the value at the boundary between the two buckets. In this case, the buckets would be [[1, 2], [3]]. Since the first bucket has an extra item than the second, the second item of the first bucket (2) is the 2-quantile, or Median.

#### Note: when two adjoining buckets have the same number of items, the quantile should be calculated as the average between the last item of the previous bucket and the first item of the next bucket. This library does not currently do that calculation and defaults to using the last item of the previous bucket as the boundary or quantile. Unevenly distributed buckets that produce a remainder will always add an extra items to each previous bucket until the remainer is exhausted. In this case, earlier buckets will have 1 more item than later buckets, depending on `input.length / n`.

## Setup

```bash
npm i @ethersage/quantile --save
```

## Usage

```js
const { bucket, quantile } = require('@ethersage/quantile');

bucket(2, [5, 6, 7, 8, 1, 2, 3, 4])); // => [[1, 2, 3, 4], [5, 6, 7, 8]]
bucket(3, [5, 6, 7, 8, 1, 2, 3, 4])); // => [[1, 2, 3], [4, 5, 6], [7, 8]]
bucket(3, [5, 6, 5, 3, 1, 2, 3, 4])); // => [[1, 2, 3], [3, 4, 5], [5, 6]]

quantile(2, [5, 6, 7, 8, 1, 2, 3, 4])); // => [4]
quantile(3, [5, 6, 7, 8, 1, 2, 3, 4])); // => [3, 6] 
quantile(3, [5, 6, 5, 3, 1, 2, 3, 4])); // => [3, 5]
```
