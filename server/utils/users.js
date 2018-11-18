
class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const newUser = { id, name, room };
    this.users.push(newUser);
    return newUser;
  }

  removeUser(id) {
    let removedUser;
    this.users = this.users.filter((user) => {
      if (user.id === id)  {
        removedUser = user;
      }
      return user.id !== id;
    });

    return removedUser;
  }

  getUser(id) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return this.users[i];
      }
    }
    return undefined;
  }

  getUserList(room) {
    return this.users
      .filter(user => user.room === room)
      .map(user => user.name);
  }
}

module.exports = { Users };
