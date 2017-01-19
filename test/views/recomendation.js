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

describe('recommendation view', function() {
    it('should return a recommendation for a valid category', done => {
        var recs = recommendation(subtopics[0].id);
        if(recs.length > 0) {
            return done();
        } else {
            return done(new Error('recommendations weren\'t generated'));
        }
    });
    it('should sort the recommendations by their strength', done => {
        var recs = recommendation(subtopics[0].id);
        var links = recs.map( r => r.links );
        var prev = links[0];
        for( let i in links ) {
            if(links[i] > prev) {
                return done(new Error('recommendations weren\'t ordered')); 
            }
            prev = links[i];
        }
        return done();
    });
    
    it('shouldn\'t recommend itsself', done => {
        var recs = recommendation(subtopics[0].id);
        var ids = recs.map( r => r.subtopic );
        if(ids.includes(subtopics[0].id)) {
            return done(new Error('subtopic recommended self'));
        }
        done();
    });
});