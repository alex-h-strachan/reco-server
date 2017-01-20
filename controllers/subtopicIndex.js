class SubtopicIndex {
    constructor(subtopics) {
        subtopics.forEach( st => {
            this[st.id] = st;
        });
    }
}

// initialize the controller
var subtopics = require('../data/subtopics.json');

var subtopicIndex = new SubtopicIndex(subtopics);
var methods = {
    get(id) {
        return subtopicIndex[id];
    }
};

module.exports = methods;