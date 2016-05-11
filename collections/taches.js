taches = new Mongo.Collection("taches");

Globals.schemas.Taches = new SimpleSchema({
    tag: {
        type: String,
        max: 100,
        label: 'Tags'
    },
    categorie: {
        type: String,
        label: 'Catégorie'
    },
    mailingList: {
        type: String,
        label: 'Mailing List'
    },
    date: {
        type: String
    },

    heure: {
        type: String
    },
    description: {
        type: String,
        max: 1000,
        autoform: {
            afFieldInput: {
                type: "textarea",
                rows: 8
            }
        }
    }
});

taches.attachSchema(Globals.schemas.Taches);
