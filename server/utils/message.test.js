const { assert } = require('chai');
const { generateMessage } = require('../utils/message');

describe('Generate Message', () => {
  it('Should generate the correct message object.', () => {
    const result = generateMessage('El Derpo', 'Hey buddy!');

    assert.equal('El Derpo', result.from);
    assert.equal('Hey buddy!', result.text);
    assert.isNumber(result.createAt);
  });
});
