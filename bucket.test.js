const expect = require('chai').expect;
const { bucket, countPerBucket } = require('./bucket');
const { sort } = require('./sort');

const sortedBucket = bucket(sort);

describe('bucket', () => {
  describe('evenly', () => {
    it('', () => {
      expect(sortedBucket(2, [5, 6, 7, 8, 1, 2, 3, 4]))
      .to.eql([[1, 2, 3, 4], [5, 6, 7, 8]]);
    });

    it('sorts numerically, not alphabetically', () => {
      expect(sortedBucket(2, [2, 10])) // numeric should return [[2], [10]], alpha [[10], [2]]
      .to.eql([[2], [10]]);
    });
  });

  describe('unevenly', () => {
    it('', () => {
      expect(sortedBucket(3, [5, 6, 7, 8, 1, 2, 3, 4]))
      .to.eql([[1, 2, 3], [4, 5, 6], [7, 8]]);
    });

    it('with duplicates on the split boundary', () => {
      expect(sortedBucket(3, [5, 6, 5, 3, 1, 2, 3, 4]))
      .to.eql([[1, 2, 3], [3, 4, 5], [5, 6]]);
    });
  });
});

describe('countPerBucket', () => {
  it('evenly divisible remainder zero', () => {
    expect(countPerBucket(8, 2)).to.eql({
      initialBucketLength: 4,
      remainder: 0
    });
  });

  it('unevenly divisible remainder non-zero', () => {
    expect(countPerBucket(7, 2)).to.eql({
      initialBucketLength: 3,
      remainder: 1
    });
  });
});
