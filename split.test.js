const { expect } = require('chai');
const { split, splitByLength, splitByLengthAndRemainder } = require('./split');

describe('splitByLength', () => {
  it('evenly', () => {
    expect(splitByLength(2, [1, 2, 3, 4])).to.eql({
      currentItems: [1, 2],
      nextItems: [3, 4],
    });
  });

  it('unevenly', () => {
    expect(splitByLength(3, [1, 2, 3, 4])).to.eql({
      currentItems: [1, 2, 3],
      nextItems: [4],
    });
  });

  it('overshot', () => {
    expect(splitByLength(5, [1, 2, 3, 4])).to.eql({
      currentItems: [1, 2, 3, 4],
      nextItems: [],
    });
  });
});

describe('splitByLengthAndRemainder', () => {
  it('zero remainder', () => {
    expect(splitByLengthAndRemainder(4, 0, [1, 2, 3, 4, 5, 6, 7, 8])).to.eql({
      currentItems: [1, 2, 3, 4],
      nextItems: [5, 6, 7, 8],
    });
  });

  it('non-zero remainder', () => {
    expect(splitByLengthAndRemainder(2, 1, [1, 2, 3, 4, 5, 6, 7, 8])).to.eql({
      currentItems: [1, 2, 3],
      nextItems: [4, 5, 6, 7 ,8],
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
