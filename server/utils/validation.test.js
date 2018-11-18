const { assert } = require('chai');
const { isRealString } = require('../utils/validation');

describe('Validation - isRealString', () => {
  it('Should return true for string', () => {
    const result = isRealString('Yup I am a string');
    assert.isTrue(result);
  });

  it('Should return false for not string', () => {
    const result = isRealString(12345);
    assert.isFalse(result);
  });

  it('Should return false for empty string', () => {
    const result = isRealString('');
    assert.isFalse(result);
  });

  it('Should return false for string of whitespace', () => {
    const result = isRealString('   ');
    assert.isFalse(result);
  });
});
