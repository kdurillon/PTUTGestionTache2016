/**
 * Created by lp on 01/06/2016.
 */

reponsesForm = new Mongo.Collection("reponsesFormulaires");

reponsesForm.allow({

    insert: function () {
        // the user must be logged in, and the document must be owned by the user
        return true;
    },
    update: function () {
        // can only change your own documents
        return true;
    },
    remove: function () {
        // can only remove your own documents
        return true;
    },
    fetch: ['owner']

});
