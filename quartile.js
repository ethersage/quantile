/**
 * (numbers: Array<numbers>, numBuckets) => [[],[]]
 * 
 * [1,9,5,1,2,4,9,8] => [[1,1,2,4], [5,8,9,9]]
 */

const indicesToSplitOn = require('./indicesToSplitOn');
const splitByIndices = require('./splitByIndices');
const sort = numbers => numbers.sort(n => n);

// (arr, n) => [[],[]]
const quartile = (n, arr) => {
    const indices = indicesToSplitOn(n, arr.length);

    return [[],[]];
};

module.exports = quartile;


