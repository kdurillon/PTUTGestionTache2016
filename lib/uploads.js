uploads = new Mongo.Collection("uploads");

Globals.schemas.Uploads = new SimpleSchema({
    userId: {
        type: String,
        max: 50
    },
    EmailId: {
        type: String,
        max: 50
    },
    numElement: {
        type: String,
        max: 50
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

uploads.attachSchema(Globals.schemas.Uploads);