categories = new Mongo.Collection("categories");

Globals.schemas.Categorie = new SimpleSchema({
    nom: {
        type: String,
        max: 50,
        label: "Nom de la catégorie",
        unique: true

    },
    couleur: {
        type: String,
        label: "Couleur"
    },
    description: {
        type: String,
        max: 150,
        optional: true,
        autoform: {
            placeholder: "Description ... (optionnelle)"
        }
    }
});

Globals.schemas.Categorie.messages({
    notUnique: '[label] existe déjà.'
});

categories.attachSchema(Globals.schemas.Categorie);