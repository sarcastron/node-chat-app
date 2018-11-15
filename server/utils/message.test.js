const { assert } = require('chai');
const { generateMessage, generateLocationMessage } = require('../utils/message');

describe('Generate Message', () => {
  it('Should generate the correct message object.', () => {
    const result = generateMessage('El Derpo', 'Hey buddy!');

    assert.equal('El Derpo', result.from);
    assert.equal('Hey buddy!', result.text);
    assert.isNumber(result.createdAt);
  });
});

describe('Generate Location Message', () => {
  it('Should generate the correct location message object.', () => {
    const result = generateLocationMessage('El Derpo', 34.2159117, -118.5894252);

    assert.equal('El Derpo', result.from);
    assert.equal('https://google.com/maps?q=34.2159117,-118.5894252', result.url);
    assert.isNumber(result.createdAt);
  });
});
