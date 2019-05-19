const { expect } = require('chai');
const { split, splitWithRemainder, splitByLength } = require('./split');

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

describe('splitWithRemainder', () => {
  it('all by bucket length + remainder', () => {
    expect(splitWithRemainder(splitByLength, 2, 0, [1, 2, 3, 4])).to.eql({
      currentItems: [1, 2],
      nextItems: [3, 4],
    });
  });
});

describe('split', () => {
  it('all by bucket length + remainder', () => {
    expect(split(4, 0, [1, 2, 3, 4, 5, 6, 7, 8])).to.eql([[1, 2, 3, 4], [5, 6, 7, 8]]);
  });
});
