// (count: number, numBuckets: number) => { remainder, initialBucketSize }
const countPerBucket = (count, numBuckets) => {
    const remainder = count % numBuckets;
    const initialBucketSize = Math.floor(count / numBuckets);

    return {
        remainder,
        initialBucketSize,
    };
}

module.exports = countPerBucket;