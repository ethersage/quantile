/**
 * (n: number, numbers: Array<numbers>) => [[]: array<numbers>,[array]<numbers>]
 *
 * Given a number of subsets n and an array of numbers, return the n-quantiles
 * as an array of arrays.
 *
 * Example of 2-quantile: [1,9,5,1,2,4,9,8] => [[1,1,2,4], [5,8,9,9]]
 *
 * We can make this even more generic to accept a sorting mechanism.
 *
 * Quantiles: https://en.wikipedia.org/wiki/Quantile
 */

const countPerBucket = require('./countPerBucket');
const { split } = require('./split');
const sort = numbers => numbers.sort(n => n);

const genericQuantile = (sortFn, n, items) => {
    const { initialBucketLength, remainder } = countPerBucket(items.length, n);

    return split(initialBucketLength, remainder, sortFn(items));
};

const sortBy = sortPredicate => (...args) => {
  const sortFn = items => items.sort(sortPredicate);

  return genericQuantile(sortFn, ...args);
}

const quantile = sortBy();

module.exports = {
  quantile,
  sortBy,
};
