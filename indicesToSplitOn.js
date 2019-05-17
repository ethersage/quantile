const countPerBucket = require('./countPerBucket');
const splitByIndex = require('./splitByIndex');

// (remainder, initialBucketSize) => [index1, index2, ....]
const indicesToSplitOn = (numBuckets, length) => {
    const { remainder, initialBucketSize } = countPerBucket(length, numBuckets);
    
    return splitByIndex(remainder, initialBucketSize, numBuckets - 1, []);
};

module.exports = indicesToSplitOn;