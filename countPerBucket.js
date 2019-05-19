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

module.exports = { countPerBucket };
