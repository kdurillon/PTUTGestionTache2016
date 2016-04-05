Mails = new Mongo.Collection("mailinglists");

Mails.allow({

    insert: function () {
        // the user must be logged in, and the document must be owned by the user
        return true;
    },
    update: function () {
        // can only change your own documents
        return true;
    },
    remove: function (userId, doc) {
        // can only remove your own documents
        return doc.owner === userId;
    },
    fetch: ['owner']

});
