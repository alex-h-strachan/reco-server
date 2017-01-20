var User = require('./User');

class UserTable {
    constructor() {
        this._users = {};
    }

    user(id) {
        if(!this._users[id]) {
            this._users[id] = new User(id);
        }

        return this._users[id];
    }
}

module.exports = UserTable;