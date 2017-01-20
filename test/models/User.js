/*global before*/
/*global describe*/
/*global it*/

var User,
    listens;

before(function() {
    this.timeout(0);
    User = require('../../models/User');
    listens = require('../../data/listens.json');
});

describe('User', () => {
    it('constructs without error', done => {
        var user = new User(listens[0].user);
        if(user instanceof User) {
            return done();
        } else {
            return done(
                new Error('User malformed')
            );
        }
    });
    it('should increment listens', done => {
        var user = new User(listens[0].user);
        user.listen(listens[0]);
        if(user.listenedTo[listens[0].subtopic] == 1) {
            return done();
        } else {
            return done(
                new Error('user listen count wasn\'t correct')
            );
        }
    });
});