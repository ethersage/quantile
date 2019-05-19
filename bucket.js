const curry = require('lodash.curry');

const { split } = require('./split');

/**
 * Determines the default bucket size and how many remaining items there will be
 *
 * @param {Number} length Length of items
 * @param {Number} numBuckets Number of buckets to divide the items up into
 */
const countPerBucket = (length, numBuckets) => {
    const remainder = length % numBuckets;
    const initialBucketLength = Math.floor(length / numBuckets);

    return {
        remainder,
        initialBucketLength,
    };
}

/**
 * Returns n-quantile buckets using default numerical sort. This function is curried so it can be invoked with 1, 2 or 3 arguments.
 * If less than 3 arguments are passed it will partially apply the arguments that were passed and return a function taking the remaining
 * arguments.
 *
 * @param {Function} sortFn (items: Array<T>) => Array<T> Custom sort function. Defaults to numerical sort
 * @param {Number} n n-quantile
 * @param {Array<Number>} items Items to bucket
 *
 * @example Median using default numerical sort = bucket(2, [1,9,5,1,2,4,9,8]) => [[1, 1, 2, 4], [4, 8, 9, 9]]
 * @example Tercile = bucket(3, [5, 6, 7, 8, 1, 2, 3, 4] => [[1, 2, 3], [4, 5, 6], [7, 8]]
 *
 * @returns {Array<Array<Number>>} Each sub-array is a bucket
 */
const bucket = curry((sortFn, n, items) => {
    const { initialBucketLength, remainder } = countPerBucket(items.length, n);

    return split(initialBucketLength, remainder, sortFn(items));
});

module.exports = {
  bucket,
  countPerBucket,
};
