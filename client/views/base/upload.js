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
        var date = moment().format("DD/MM/YYYY HH:mm");
        return {  currentUserId: Meteor.userId(), currentDate: date }
    }
});

