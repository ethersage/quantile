const expect = require('chai').expect;
const countPerBucket = require('./countPerBucket');

describe('countPerBucket', () => {
    it('evenly divisible remainder zero', () => {
        expect(countPerBucket(8, 2)).to.eql({
          initialBucketLength: 4,
          remainder: 0
        });
    })
});
