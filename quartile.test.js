const expect = require('chai').expect;

const quartile = require('./quartile');

// const test1 = [1,9,5,1,2,4,9,8];

describe('unsorted evenly divisible arrays', () => {
    it('returns two even buckets separated in the middle', () => {
        expect(quartile(2, [1, 2, 3, 4, 5, 6, 7, 8]))
        .to.eql([[1, 2, 3, 4], [5, 6, 7, 8]]);
    })
});