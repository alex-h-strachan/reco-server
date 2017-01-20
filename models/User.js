class User {
    constructor(id) {
        this.id = id;
        this.listenedTo = {};
        this.lastListenWasNew;
    }

    listen(listen) {
        if(this.listenedTo[listen.subtopic]) {
            // user has already listened to this so the relationship has already been recorded
            this.lastListenWasNew = false;
            return;
        }

        this.lastListenWasNew = true;
        this.listenedTo[listen.subtopic] = true;
    }
}

module.exports = User;