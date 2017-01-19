/*global before*/
/*global describe*/
/*global it*/

var recommendation,
    subtopics;

before(function() {
    this.timeout(0);
    recommendation = require('../../views/recommendation');
    subtopics = require('../../data/subtopics.json');
});

describe('recommendation', function() {
    it('should return a recommendation for a valid category', done => {
        var recs = recommendation(subtopics[0].id, 10);
        if(recs.length > 0) {
            return done();
        } else {
            return done(new Error('recommendations weren\'t generated'));
        }
    });
});