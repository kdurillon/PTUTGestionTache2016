uploads = new Mongo.Collection("uploads");

Globals.schemas.Uploads = new SimpleSchema({
    userId: {
        type: String,
        max: 50
    },
    file: {
        type: String
    },
    date: {
        type: String
    }
});

uploads.attachSchema(Globals.schemas.Uploads);