Template.gestionDocuments.events({
    'click .btn-upload': function() {
        Modal.show('uploadModal');
    },
    'click .delete_doc': function() {
        var id = this._id;
        swal({
                title: "Etes vous sûr?",
                text: "Le fichier sera définitivement supprimé!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Oui",
                cancelButtonText: "Annuler",
                closeOnConfirm: false
        }).then(
            function(isConfirm){
                if(isConfirm) {
                    Meteor.call('deleteUploads', id, function (err, response) {
                        if (err) {
                            swal("Echec!", "La suppression à echoué, raison :" + err, "error");
                            return;
                        }
                        swal("Suppression!", "Le fichier à été supprimé.", "success");
                    });

                }
            });
    },
});
