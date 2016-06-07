Uploader.localisation = {
    browse: "Choisir un/des fichier(s)",
    cancelled: "Annulé",
    remove: "Supprimer",
    upload: "Envoyer",
    done: "Réussi",
    cancel: "Annuler"
};

Template['uploadModalExt'].helpers({

        cuserId: function() {

        var idFormulaire =Router.current().params;

        var idForm=idFormulaire["_id"];

        return {  currentUserId: idForm }
    }
});

Template.formulaireGenere.events({


    "click .uploadExt": function (event) {
        alert("ok");
        event.prevent_default();
    }
});

