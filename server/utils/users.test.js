const { assert } = require('chai');
const { Users } = require('../utils/users');

describe('Users - addUser', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      { id: 1, name: 'Dufus', room: 'DuckTales' },
      { id: 2, name: 'Huey', room: 'DuckTales' },
      { id: 3, name: 'HerpTheDerp', room: 'The Blerg Room' },
    ];
  });

  it('Should add a new user', () => {
    const user = {
      id: 123,
      name: 'El Derpo',
      room: 'The Blerg Room',
    };

    const result = users.addUser(user.id, user.name, user.room);

    assert.equal(user.id, result.id);
    assert.equal(user.name, result.name);
    assert.equal(user.room, result.room);
    assert.equal(4, users.users.length);
  });

  it('Should remove a user', () => {
    const result = users.removeUser(2);
    assert.equal(2, users.users.length);
    assert.equal('Huey', result.name);
  });

  it('Should not remove a user', () => {
    const result = users.removeUser('nope');
    assert.equal(3, users.users.length);
    assert.isUndefined(result);
  });

  it('Should find a user', () => {
    const result = users.getUser(2);
    assert.equal(3, users.users.length);
    assert.equal('Huey', result.name);
  });

  it('Should not find a user', () => {
    const result = users.getUser('no-way');
    assert.equal(3, users.users.length);
    assert.isUndefined(result);
  });

  it('Should return an array of users in a room', () => {
    const result = users.getUserList('DuckTales');

    assert.equal(2, result.length);
    assert.equal('Huey', result[1]);
  });
});
