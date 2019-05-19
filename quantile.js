/**
 * (n: number, numbers: Array<numbers>) => [[]: array<numbers>,[array]<numbers>]
 *
 * Given a number of subsets n and an array of numbers, return the n-quantiles
 * An n-quantile is a set of n - 1 numbers where each number is the dividing line.
 * The median is the 2-quantile.
 *
 * Example of 2-quantile (median): [1,9,5,1,2,4,9,8] => [4]
 * Example of a 3-quantile: [5, 6, 7, 8, 1, 2, 3, 4] => [3, 6]
 *
 * Quantiles: https://en.wikipedia.org/wiki/Quantile
 */

const countPerBucket = require('./countPerBucket');
const { split } = require('./split');

/**
 * Default numerical sort
 *
 * @param {Array} arr The array to sort
 *
 * @returns {Array} The sorted array
 */
const sort = arr => arr.sort();

/**
 * Returns a bucket function (n: number, items: array<number>) that will produce n-quantile buckets
 *
 * @param {Function} sortFn (items: Array<T>) => Array<T> Custom sort function. Defaults to numerical sort.
 *
 * @example Median using default numerical sort = getBucket()(2, [1,9,5,1,2,4,9,8]) => [[1, 1, 2, 4], [4, 8, 9, 9]]
 * @example Tercile = getBucket()(3, [5, 6, 7, 8, 1, 2, 3, 4] => [[1, 2, 3], [4, 5, 6], [7, 8]]
 *
 * @returns {Function} (n: number, items: Array<T>) => <Array<Array<T>> Bucket function
 */
const getBucket = (sortFn = sort) => (n, items) => {
    const { initialBucketLength, remainder } = countPerBucket(items.length, n);

    return split(initialBucketLength, remainder, sortFn(items));
};

/**
 * Returns n-quantile buckets using default numerical sort
 *
 * @param {Number} n n-quantile
 * @param {Array<Number>} items Items to bucket
 *
 * @example Median using default numerical sort = bucket(2, [1,9,5,1,2,4,9,8]) => [[1, 1, 2, 4], [4, 8, 9, 9]]
 * @example Tercile = bucket(3, [5, 6, 7, 8, 1, 2, 3, 4] => [[1, 2, 3], [4, 5, 6], [7, 8]]
 *
 * @returns {Array<Array<Number>>} Each sub-array is a bucket
 */
const bucket = getBucket();

/**
 * Returns a quantile function (n: Number, items: Array<T>) that will produce n-quantiles
 *
 * @param {Function} sortFn (items: Array<T>) => Array<T> Custom sort function. Defaults to numerical sort
 *
 * @example Median = getQuantile()(2, [1,9,5,1,2,4,9,8]) => [4]
 * @example Tercile = getQuantile()(3, [5, 6, 7, 8, 1, 2, 3, 4] => [3, 6]
 *
 * @returns {Function} (n: Number, items: Array<T>) => Array<T> Quantile function
 */
const getQuantile = (sortFn = sort) => (n, items) => {
  const bucketFn = getBucket(sortFn);
  const buckets = bucketFn(n, items);

  return buckets.slice(0, buckets.length - 1).map(b => b[b.length - 1]);
};

/**
 * Returns the n-quantile set for a list of numbers
 *
 * @param {Number} n n-quantile
 * @param {Array<Number>} items Items to quantile
 *
 * @example Median = quantile(2, [1,9,5,1,2,4,9,8]) => [4]
 * @example Tercile = quantile(3, [5, 6, 7, 8, 1, 2, 3, 4] => [3, 6]
 *
 * @returns {Array<Number>} n-quantiles
 */
const quantile = getQuantile();

/**
 * @typedef {Object} SortByGrouping
 * @property {Function} bucket (n: number, items: Array<T>) => <Array<Array<T>> Bucket function
 * @property {Function} quantile (n: Number, items: Array<T>) => Array<T> Quantile function
 */

/**
 * Get versions of bucket and quantile that use a custom sort
 *
 * @param {Function} sortFn (items: Array<T>) => Array<T> Custom sort function
 *
 * @returns {SortByGrouping} Versions of bucket and quantile using the custom sort
 */
const sortBy = sortFn => ({
  bucket: getBucket(sortFn),
  quantile: getQuantile(sortFn),
})

module.exports = {
  bucket,
  quantile,
  sortBy,
};
