const expect = require('chai').expect;

const {
  median,
  octile,
  quantile,
  quartile,
  tercile,
} = require('./');

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
