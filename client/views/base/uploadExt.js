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
        var email=idFormulaire["mailEncode"];

            var num= $(event.target).attr("id");
            num=num.substr(9,num.length);    

        return {  currentUserId: idForm ,currentElmtId:num, currentEmailId:email}
    }
});

Template.formulaireGenere.events({


    "click .uploadExt": function (event) {
        alert("ok");
        event.prevent_default();
    }
});

