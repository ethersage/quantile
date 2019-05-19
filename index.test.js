const expect = require('chai').expect;

const {
  bucket,
  median,
  octile,
  quantile,
  quartile,
  tercile,
} = require('./');

describe('bucket', () => {
  describe('evenly', () => {
    it('', () => {
      expect(bucket(2, [5, 6, 7, 8, 1, 2, 3, 4]))
      .to.eql([[1, 2, 3, 4], [5, 6, 7, 8]]);
    });

    it('sorts numerically, not alphabetically', () => {
      expect(bucket(2, [2, 10])) // numeric should return [[2], [10]], alpha [[10], [2]]
      .to.eql([[2], [10]]);
    });
  });

  describe('unevenly', () => {
    it('', () => {
      expect(bucket(3, [5, 6, 7, 8, 1, 2, 3, 4]))
      .to.eql([[1, 2, 3], [4, 5, 6], [7, 8]]);
    });

    it('with duplicates on the split boundary', () => {
      expect(bucket(3, [5, 6, 5, 3, 1, 2, 3, 4]))
      .to.eql([[1, 2, 3], [3, 4, 5], [5, 6]]);
    });
  });
});

describe('quantile', () => {
  it('evenly', () => {
    expect(quantile(2, [5, 6, 7, 8, 1, 2, 3, 4]))
    .to.eql([4.5]);
  });

  describe('unevenly', () => {
    it('', () => {
      expect(quantile(3, [5, 6, 7, 8, 1, 2, 3, 4]))
      .to.eql([3.5, 6]);
    });

    it('with duplicates on the split boundary', () => {
      expect(quantile(3, [5, 6, 5, 3, 1, 2, 3, 4]))
      .to.eql([3, 5]);
    });
  });
});

describe('semantic', () => {
  it('median', () => {
    expect(median([5, 6, 7, 8, 1, 2, 3, 4]))
    .to.eql([4.5]);
  });

  it('tercile', () => {
    expect(tercile([5, 6, 7, 8, 1, 2, 3, 4]))
    .to.eql([3.5, 6]);
  });

  it('quartile', () => {
    expect(quartile([5, 6, 7, 8, 1, 2, 3, 4]))
    .to.eql([2.5, 4.5, 6.5]);
  });

  it('octile', () => {
    expect(octile([5, 6, 7, 8, 1, 2, 10, 3, 4, 9, 1, 1, 6, 8, 9, 0, 9, 1, 0, 5]))
    // => buckets: [0, 0], [1, 1], [1, 1], [2, 3], [4, 5], [5, 6], [6, 7], [8, 8], [9, 9], [9, 10]
    .to.eql([0.5, 1, 1.5, 3.5, 5, 6, 7.5, 8.5, 9]);
  });
});
