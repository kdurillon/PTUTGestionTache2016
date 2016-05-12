Template.tacheHome.helpers({
    optionsReactiveTable: function() {
        return {
            fields: ['titre', 'type', 'categorie', 'dateDebut', 'dateFin']
        };
    }
});

Template.tacheHome.events({
    "click .delete_tache": function() {
        var id = this._id;
        swal({
                title: "Etes vous sûr?",
                text: "La tâche sera définitivement supprimé!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Oui",
                cancelButtonText: "Annuler",
                closeOnConfirm: false
            },
            function(){
                taches.remove(id);
                swal("Suppression!", "La tâche à été supprimé.", "success");
            });
    },

    "click .info_tache": function() {
        var tache = taches.findOne({_id: this._id});
        Modal.show('modalInfoTache', function () {
            return tache;
        });
    }
});

AutoForm.addHooks('addTache', {
    after: {
        insert: function(error) {
            if (error) {
                swal("Erreur", "Erreur a l'insertion!", "error");
            } else {
                sweetAlert({
                    title: "Réussi !",
                    text: "La tâche à été créé correctement",
                    type: "success",
                    confirmButtonText: "OK"
                }, function(){
                    Router.go(Utils.pathFor('tacheHome'))
                });
            }
        }
    }
},true);
