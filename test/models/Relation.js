/*global before*/
/*global describe*/
/*global it*/

var Relation;

before(function() {
    Relation = require('../../models/Relation');
});
    
describe('Relation', () => {
    it('constructs without error', done => {
        var relation = new Relation('0', 1, 1);
        if(relation instanceof Relation) {
            return done();
        } else {
            return done(
                new Error('Relation malformed')
            );
        }
    });
    it('constructs with the expected properties', done => {
        var relation = new Relation('0', 1, 1);
        if(relation.parent && relation.links && relation.subtopic) {
            return done();
        } else {
            return done(
                new Error('Relation malformed')
            );
        }
    });
});