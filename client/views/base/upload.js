Uploader.localisation = {
    browse: "Choisir un/des fichier(s)",
    cancelled: "Annulé",
    remove: "Supprimer",
    upload: "Envoyer",
    done: "Réussi",
    cancel: "Annuler"
};

Template['uploadModal'].helpers({
    cuserId: function() {
        return {  currentUserId: Meteor.userId() ,currentElmtId :"0",currentEmailId:"0"  }
    }
});

