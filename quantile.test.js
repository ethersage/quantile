const expect = require('chai').expect;

const { quantile } = require('./quantile');

// const test1 = [1,9,5,1,2,4,9,8];

describe('sorted', () => {
    it('evenly', () => {
        expect(quantile(2, [1, 2, 3, 4, 5, 6, 7, 8]))
        .to.eql([[1, 2, 3, 4], [5, 6, 7, 8]]);
    });

    it('unevenly', () => {
        expect(quantile(3, [1, 2, 3, 4, 5, 6, 7, 8]))
        .to.eql([[1, 2, 3], [4, 5, 6], [7, 8]]);
    });
});

describe('unsorted', () => {
    it('evenly', () => {
        expect(quantile(2, [5, 6, 7, 8, 1, 2, 3, 4]))
        .to.eql([[1, 2, 3, 4], [5, 6, 7, 8]]);
    });

    describe('unevenly', () => {
      it('', () => {
          expect(quantile(3, [5, 6, 7, 8, 1, 2, 3, 4]))
          .to.eql([[1, 2, 3], [4, 5, 6], [7, 8]]);
      });

      it('with duplicates on the split boundary', () => {
          expect(quantile(3, [5, 6, 5, 3, 1, 2, 3, 4]))
          .to.eql([[1, 2, 3], [3, 4, 5], [5, 6]]);
      });
    });
});
