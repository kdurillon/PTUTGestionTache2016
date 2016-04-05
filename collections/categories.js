categories = new Mongo.Collection("categories");

Globals.schemas.Categorie = new SimpleSchema({
    nom: {
        type: String,
        max: 50,
        label: "Nom de la catégorie"
    },
    couleur: {
        type: String,
        label: "Couleur",
        autoform: {
            type: "bootstrap-colorpicker"
        }
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

categories.attachSchema(Globals.schemas.Categorie);