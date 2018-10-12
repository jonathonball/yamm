var assert = require('assert');

describe('array', function() {
    describe('#isArray()', function() {
        it('can identify arrays', function() {
            assert.strictEqual(Array.isArray([]), true);
        });
    });
});
