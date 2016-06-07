taches = new Mongo.Collection("taches");

Globals.schemas.Taches = new SimpleSchema({
    userId: {
        type: String,
        denyUpdate: true,
        autoValue: function(){
            var userId = null;
            if(!_.isUndefined(Meteor.call('getUserId'))) {
                userId = Meteor.call('getUserId');
            }else{
                userId = Meteor.userId();
            }
            if(this.isInsert){
                return userId;
            }
            else if(this.isUpsert){
                return {$setOnInsert: userId};
            }
            else{
                this.unset();
            }
        },
        autoform: {
            omit: true
        }
    },
    tacheParent: {
        type: Object,
        label: "Tâche Parent",
        optional: true,
        blackbox: true
    },
    titre: {
        type: String,
        max: 100
    },
    tags: {
        type: String,
        max: 100,
        label: 'Tags',
        optional: true
    },
    categorie: {
        type: String,
        label: 'Catégorie',
        optional: true
    },
    mailingList: {
        type: [String],
        label: 'Mailing List',
        optional: true,
        autoform: {
            type: "select2",
            afFieldInput: {
                multiple: true
            }
        }
    },
    emails: {
        type: [String],
        label: 'Emails',
        optional: true,
        regEx: SimpleSchema.RegEx.Email
    },
    dateFin: {
        type: String,
        optional: true
    },
    contenu: {
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
           omit: true
        }
    },
    document: {
        type: String,
        optional: true
    },
    formulaire: {
        type: String,
        optional :true
    },
    dateCreation: {
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
    },
    fini: {
        type: Boolean,
        defaultValue: false,
        autoform: {
            omit: true
        }
    }
});

taches.attachSchema(Globals.schemas.Taches);
