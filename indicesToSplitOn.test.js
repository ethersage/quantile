const expect = require('chai').expect;

const indicesToSplitOn = require('./indicesToSplitOn');

describe('indicesToSplitOn', () => {
    it('returns a single index for n - 1 when n=2', () => {
        const numBuckets = 2,
              length = 8;

        expect(indicesToSplitOn(numBuckets, length))
        .to.eql([4]);
    });
})