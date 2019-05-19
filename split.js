/**
 * (bucketLength: number, remainder: number, items: array) => { split: array, items: array }
 * (splitLength: number, items: array) => { split: array, remaining: array }
 */

const getSplitByLengthAndRemainder = splitFn => (bucketLength, remainder, items) => splitFn(bucketLength + remainder, items);

const splitByLength = (splitLength, items) => ({
  currentItems: items.slice(0, splitLength),
  nextItems: items.slice(splitLength),
});

const splitByLengthAndRemainder = getSplitByLengthAndRemainder(splitByLength);

const split = (bucketLength, remainder, nextItems, currentItems = []) => {
  console.log('split!');
  console.log('bucketLength', bucketLength);
  console.log('remainder', remainder);
  if (!nextItems.length) {
    return currentItems || [];
  }

  const { currentItems: current, nextItems: next } = splitByLengthAndRemainder(bucketLength, remainder ? 1: 0, nextItems);

  return split(
    bucketLength,
    remainder > 0 ? remainder - 1 : 0,
    next,
    [...currentItems, current],
  );
}

module.exports = {
  splitByLength,
  splitByLengthAndRemainder,
  split,
};
