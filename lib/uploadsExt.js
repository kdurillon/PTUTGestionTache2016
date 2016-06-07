uploadsExt = new Mongo.Collection("uploadsExt");

Globals.schemas.Uploads = new SimpleSchema({
    emailId: {
        type: String,
        max: 150
    },
    formId: {
        type: String,
        max: 150
    },

    file: {
        type: String
    },
    date: {
        type: String,
        autoValue: function(){
            return moment().format('L - LT');
        },
        autoform: {
            omit: true
        }
    }
});

uploadsExt.attachSchema(Globals.schemas.uploadsExt);