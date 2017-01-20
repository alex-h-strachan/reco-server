class User {
    constructor(id) {
        this.id = id;
        this.listenedTo = {};
    }

    listen(listen) {
        this.listenedTo[listen.subtopic] = (this.listenedTo[listen.subtopic] || 0) + 1;
    }
}

module.exports = User;