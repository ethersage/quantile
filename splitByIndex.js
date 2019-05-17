const splitByIndex = (remainder, bucketSize, limit, ix) => {
    if (ix.length === limit) {
        return ix;
    }

    const newRemainder = remainder > 0 ? remainder - 1 : 0;

    return splitByIndex(newRemainder, bucketSize, limit, [
        ...ix, bucketSize + remainder
    ]);
};

module.exports = splitByIndex;