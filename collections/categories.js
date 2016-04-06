categories = new Mongo.Collection("categories");

Globals.schemas.Categorie = new SimpleSchema({
    nom: {
        type: String,
        max: 50,
        label: "Nom de la catégorie",
        custom: function(){
            console.log("custom");
                if(categories.findOne({nom: this.value})){
                    console.log(this.value);
                    return "alreadyExist";
                }
        }
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

categories.attachSchema(Globals.schemas.Categorie);