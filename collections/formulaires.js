formulaires = new Mongo.Collection("formulaires");

Globals.schemas.Formulaire = new SimpleSchema({
    nom: {
        type: String,
        max: 50,
        label: "Nom du formulaire"
    },
    elements_labels :{
        type: [String],
        label: "labels"
    },
    elements_types :{
        type: [String],
        label: "types"
    },
    elements_caracteristiques :{
        type: [String],
        label: "caractéristiques"
    }

});

formulaires.attachSchema(Globals.schemas.Formulaire);