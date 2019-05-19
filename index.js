/**
 * (n: number, numbers: Array<numbers>) => [[]: array<numbers>,[array]<numbers>]
 *
 * Given a number of subsets n and an array of numbers, return the n-quantiles
 * An n-quantile is a set of n - 1 numbers where each number is the dividing line.
 * The median is the 2-quantile.
 *
 * Example of 2-quantile (median): [1,9,5,1,2,4,9,8] => [4.5]
 * Example of a 3-quantile: [5, 6, 7, 8, 1, 2, 3, 4] => [3.5, 6]
 *
 * Quantiles: https://en.wikipedia.org/wiki/Quantile
 */

const curry = require('lodash.curry');
const flow = require('lodash.flow');

const { sort } = require('./sort');
const { average } = require('./average');
const { bucket, countPerBucket } = require('./bucket');
const { cutPoints } = require('./cutPoint.js');

/**
 * Returns the n-quantile set for a list of numbers. This function is curried so it can be invoked with 1, 2 or 3 arguments.
 * If less than 3 arguments are passed it will partially apply the arguments that were passed and return a function taking the remaining
 * arguments.
 *
 * @param {Function} sortFn (items: Array<T>) => Array<T> Custom sort function. Defaults to numerical sort
 * @param {Function} avgFn (items: Array<T>) => Array<T> Custom avg function for getting quantiles for even buckets. Defaults to average.
 * @param {Number} n n-quantile
 * @param {Array<Number>} items Items to quantile
 *
 * @example Median = quantile(2, [1,9,5,1,2,4,9,8]) => [4]
 * @example Tercile = quantile(3, [5, 6, 7, 8, 1, 2, 3, 4] => [3, 6]
 *
 * @returns {Array<Number>} n-quantiles
 */
const quantile = curry((sortFn, avgFn, n, items) => flow([
  bucket(sortFn, n),
  cutPoints(avgFn),
])(items));

const numericalQuantile = quantile(sort, average)

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
  bucket: bucket(sortFn),
  quantile: quantile(sortFn, average),
})

module.exports = {
  median: numericalQuantile(2),
  octile: numericalQuantile(10),
  quantile: numericalQuantile(),
  quartile: numericalQuantile(4),
  tercile: numericalQuantile(3),
  sortBy,
};
