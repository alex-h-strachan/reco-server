/*global before*/
/*global describe*/
/*global it*/

var recommendations,
    subtopics;

before(function() {
    this.timeout(0);
    recommendations = require('../../views/recommendations');
    subtopics = require('../../data/subtopics.json');
});

describe('recommendations', () => {
    it('should return a set of subtopics', done => {
        var recs = recommendations(subtopics[0].id);
        if(recs[0].name) {
            return done();
        }
        return done(new Error('first recommendation missing name property'));
    });
});