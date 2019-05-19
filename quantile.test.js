const expect = require('chai').expect;

const { bucket, quantile } = require('./quantile');

describe('sorted', () => {
  describe('bucket', () => {
    it('evenly', () => {
        expect(bucket(2, [1, 2, 3, 4, 5, 6, 7, 8]))
        .to.eql([[1, 2, 3, 4], [5, 6, 7, 8]]);
    });

    it('unevenly', () => {
        expect(bucket(3, [1, 2, 3, 4, 5, 6, 7, 8]))
        .to.eql([[1, 2, 3], [4, 5, 6], [7, 8]]);
    });
  });

  describe('quantile', () => {
    it('evenly', () => {
        expect(quantile(2, [1, 2, 3, 4, 5, 6, 7, 8]))
        .to.eql([4]);
    });

    it('unevenly', () => {
        expect(quantile(3, [1, 2, 3, 4, 5, 6, 7, 8]))
        .to.eql([3, 6]);
    });
  });
});

describe('unsorted', () => {
  describe('bucket', () => {
    it('evenly', () => {
        expect(bucket(2, [5, 6, 7, 8, 1, 2, 3, 4]))
        .to.eql([[1, 2, 3, 4], [5, 6, 7, 8]]);
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
        .to.eql([4]);
    });

    describe('unevenly', () => {
      it('', () => {
          expect(quantile(3, [5, 6, 7, 8, 1, 2, 3, 4]))
          .to.eql([3, 6]);
      });

      it('with duplicates on the split boundary', () => {
          expect(quantile(3, [5, 6, 5, 3, 1, 2, 3, 4]))
          .to.eql([3, 5]);
      });
    });
  });
});
