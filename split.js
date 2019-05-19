/**
 * (bucketLength: number, remainder: number, items: array) => { split: array, items: array }
 * (splitLength: number, items: array) => { split: array, remaining: array }
 */

const curry = require('lodash.curry');

/**
 * @typedef {Object} Split
 * @property {Array} current Array<T> The items that were split off
 * @property {Array} next Array<T> The items that were split off
 */

/**
 * @param {Function} splitFn (splitLength: Number, items: Array<T>) => {}
 * @param {Number} bucketLength Length of items to split off front
 * @param {Number} remainder Number of extra items to split off front
 * @param {Array} items Array<T> Items to split on
 *
 * @returns {Split} Current items split off and the remaining items
 */
const splitByLengthAndRemainder = curry((splitFn, bucketLength, remainder, items) => splitFn(bucketLength + remainder, items));

/**
 * Split some items off the front of an array
 *
 * @param {Number} splitLength Length of items to split off front
 * @param {Array} items Array<T> Items to split on
 *
 * @returns {Split} Current items split off and the remaining items
 */
const splitSegmentByLength = (splitLength, items) => ({
  current: items.slice(0, splitLength),
  next: items.slice(splitLength),
});

const splitSegment = splitByLengthAndRemainder(splitSegmentByLength);

const split = (bucketLength, remainder, nextItems, currentItems = []) => {
  if (!nextItems.length) {
    return currentItems || [];
  }

  const { current, next } = splitSegment(bucketLength, remainder ? 1: 0, nextItems);

  return split(
    bucketLength,
    remainder > 0 ? remainder - 1 : 0,
    next,
    [...currentItems, current],
  );
}

module.exports = {
  splitByLengthAndRemainder,
  splitSegment,
  splitSegmentByLength,
  split,
};
