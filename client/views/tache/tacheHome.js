Template.tacheHome.events({
    "click .delete_tache": function() {
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
                taches.remove(this._id);
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
