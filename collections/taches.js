taches = new Mongo.Collection("taches");

Globals.schemas.Taches = new SimpleSchema({
    nom: {
        type: String,
        max: 100
    },
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
        label: 'Mailing List',
        optional: true
    },
    emails: {
        type: [String],
        label: 'Emails',
        optional: true,
        regEx: SimpleSchema.RegEx.Email
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
    },
    typeTache: {
        type: String,
        autoform: {
           type: 'hidden'
        }
    },
    createdAt: {
        type: String,
        denyUpdate: true,
        autoValue: function(){
            if(this.isInsert){
                return moment().format('L - LT');
            }
            else if(this.isUpsert){
                return {$setOnInsert: moment().format('L - LT')};
            }
            else{
                this.unset();
            }
        },
        autoform: {
            omit: true
        }
    }
});

taches.attachSchema(Globals.schemas.Taches);
