/**
 * (numbers: Array<numbers>, numBuckets) => [[],[]]
 *
 * [1,9,5,1,2,4,9,8] => [[1,1,2,4], [5,8,9,9]]
 */

const countPerBucket = require('./countPerBucket');
const { split } = require('./split');
const sort = numbers => numbers.sort(n => n);

// (arr, n) => [[],[]]
const quantile = (n, arr) => {
    const { initialBucketLength, remainder } = countPerBucket(arr.length, n);

    return split(initialBucketLength, remainder, arr);
};

module.exports = quantile;


