// (count: number, numBuckets: number) => { remainder, initialBucketSize }
const countPerBucket = (count, numBuckets) => {
    const remainder = count % numBuckets;
    const initialBucketLength = Math.floor(count / numBuckets);

    return {
        remainder,
        initialBucketLength,
    };
}

module.exports = countPerBucket;
