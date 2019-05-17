const expect = require('chai').expect;

const splitByIndex = require('./splitByIndex');

describe('splitByIndex', () => {
    it('returns a single index for n - 1 when n=2', () => {
        const remainder = 0,
            initialBucketSize = 4,
            length = 1;
        
        expect(splitByIndex(remainder, initialBucketSize, length, []))
        .to.eql([4]);
    });
})