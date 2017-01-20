/*global before*/
/*global describe*/
/*global it*/

var getOrderedLinks,
    subtopics;

before(function() {
    this.timeout(0);
    getOrderedLinks = require('../../views/orderedLinks');
    subtopics = require('../../data/subtopics.json');
});

describe('getOrderedLinks view', function() {
    it('should return a getOrderedLinks for a valid category', done => {
        var recs = getOrderedLinks(subtopics[0].id);
        if(recs.length > 0) {
            return done();
        } else {
            return done(new Error('getOrderedLinkss weren\'t generated'));
        }
    });
    it('should sort the getOrderedLinkss by their strength', done => {
        var recs = getOrderedLinks(subtopics[0].id);
        var links = recs.map( r => r.links );
        var prev = links[0];
        for( let i in links ) {
            if(links[i] > prev) {
                return done(new Error('getOrderedLinkss weren\'t ordered')); 
            }
            prev = links[i];
        }
        return done();
    });
    
    it('shouldn\'t recommend itsself', done => {
        var recs = getOrderedLinks(subtopics[0].id);
        var ids = recs.map( r => r.subtopic );
        if(ids.includes(subtopics[0].id)) {
            return done(new Error('subtopic recommended self'));
        }
        done();
    });

    it('should respect the requested limit', done => {
        var recs = getOrderedLinks(subtopics[0].id, 5);
        if(recs.length != 5) {
            return done(new Error('limit ignored'));
        }
        return done();
    });
});