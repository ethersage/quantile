/**
 * (n: number, numbers: Array<numbers>) => [[]: array<numbers>,[array]<numbers>]
 *
 * Given a number of subsets n and an array of numbers, return the n-quantiles
 * as an array of arrays.
 *
 * Example of 2-quantile: [1,9,5,1,2,4,9,8] => [[1,1,2,4], [5,8,9,9]]
 * Example of a 3-quantile: []
 *
 * We can make this even more generic to accept a sorting mechanism.
 *
 * Quantiles: https://en.wikipedia.org/wiki/Quantile
 */

const countPerBucket = require('./countPerBucket');
const { split } = require('./split');
const sort = arr => arr.sort();

const getBucket = (sortFn = sort) => (n, items) => {
    const { initialBucketLength, remainder } = countPerBucket(items.length, n);

    return split(initialBucketLength, remainder, sortFn(items));
};

const bucket = getBucket();

const getQuantile = (sortFn = sort) => (n, items) => {
  const bucketFn = getBucket(sortFn);
  const buckets = bucketFn(n, items);
  return buckets.slice(0, buckets.length - 1).map(b => b[b.length - 1]);
};

const quantile = getQuantile();

const sortBy = sortFn => ({
  bucket: getBucket(sortFn),
  quantile: getQuantile(sortFn),
})

module.exports = {
  bucket,
  quantile,
  sortBy,
};
