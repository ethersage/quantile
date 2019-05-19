const { expect } = require('chai');
const { split, splitSegment, splitSegmentByLength, splitByLengthAndRemainder } = require('./split');

describe('splitSegmentByLength', () => {
  it('evenly', () => {
    expect(splitSegmentByLength(2, [1, 2, 3, 4])).to.eql({
      current: [1, 2],
      next: [3, 4],
    });
  });

  it('unevenly', () => {
    expect(splitSegmentByLength(3, [1, 2, 3, 4])).to.eql({
      current: [1, 2, 3],
      next: [4],
    });
  });

  it('overshot', () => {
    expect(splitSegmentByLength(5, [1, 2, 3, 4])).to.eql({
      current: [1, 2, 3, 4],
      next: [],
    });
  });
});

describe('splitSegment', () => {
  it('zero remainder', () => {
    expect(splitSegment(4, 0, [1, 2, 3, 4, 5, 6, 7, 8])).to.eql({
      current: [1, 2, 3, 4],
      next: [5, 6, 7, 8],
    });
  });

  it('non-zero remainder', () => {
    expect(splitSegment(2, 1, [1, 2, 3, 4, 5, 6, 7, 8])).to.eql({
      current: [1, 2, 3],
      next: [4, 5, 6, 7 ,8],
    });
  });
});

describe('split', () => {
  it('evenly', () => {
    expect(split(4, 0, [1, 2, 3, 4, 5, 6, 7, 8])).to.eql([[1, 2, 3, 4], [5, 6, 7, 8]]);
  });

  it('unevenly', () => {
    expect(split(2, 2, [1, 2, 3, 4, 5, 6, 7, 8])).to.eql([[1, 2, 3], [4, 5, 6], [7, 8]]);
  });
});
