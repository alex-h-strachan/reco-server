/*global before*/
/*global describe*/
/*global it*/

var UserTable,
    User,
    listens;

before(function() {
    this.timeout(0);
    User = require('../../models/User');
    UserTable = require('../../models/UserTable');
    listens = require('../../data/listens.json');
});

describe('UserTable', () => {
    it('constructs without error', done => {
        var userTable = new UserTable(listens);
        if(userTable instanceof UserTable) {
            return done();
        } else {
            return done(
                new Error('UserTable malformed')
            );
        }
    });
    it('has an entry for each user in the listens data', done => {
        var userTable = new UserTable(listens);
        for(let i in listens) {
            let id = listens[i].user;
            if(!(userTable.user(id) instanceof User)) {
                return done(
                    new Error('Table was missing user')
                );
            }
        }
        return done();
    });
});