const curry = require('lodash.curry');

/**
 * Compute the quantile value at the given cut point
 *
 * @param {Function} avgFn (a: T, b: T) => {Number} Average two items
 * @param {Array} prev Array<T> The accumulated computed quantile so far
 * @param {Array} current Array<T> The current bucket being evaluated
 * @param {Number} i Current index in the iteration
 * @param {Array} items Array<T> Original list of items being iterated on
 *
 * @returns {Array} Array<T> The new set of quantiles
 */
const cutPoint = curry((avgFn, prev, current, i, items) => {
  // if we're on the last bucket we're done
  if (i === items.length - 1) {
    return prev;
  }

  let value;
  const next = items[i + 1]

  if (current.length > next.length) {
    // if current bucket is longer than next bucket, use the last value in current - don't average
    value = current[current.length - 1];
  } else {
    // current and next are equal length so average last of current and first of next
    value = avgFn(current[current.length - 1], next[0]);
  }

  return [...prev, value];
});

const cutPoints = curry((avgFn, buckets) => buckets.reduce(cutPoint(avgFn), []));

module.exports = { cutPoints };
