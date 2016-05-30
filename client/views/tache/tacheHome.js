i18n.setLanguage('fr');

Template.tacheHome.helpers({
    optionsReactiveTable: function() {
        return { fields: [
            { key: 'titre', label: 'Titre' },
            { key: 'typeTache', label: 'Type' },
            { key: 'categorie', label: 'Catégorie' },
            { key: 'tags', label: 'Tags' },
            { key: 'dateCreation', label: 'Date de création' },
            { key: 'dateFin', label: 'Date de fin' },
            { label: 'Action', tmpl: Template.actionTableTache, sortable: false }
        ] }
    }
});

Template.tacheHome.events({
    "click .info_tache": function() {
        var tache = taches.findOne({_id: this._id});
        var mailinglist = mailingList.findOne({nom: tache.mailingList});
        if(!_.isUndefined(mailinglist)) {
            if(_.isUndefined(tache.emails)) {
                tache.emails = mailinglist.emails;
            }else {
                tache.emails.push(mailinglist.emails);
            }
        }
        Modal.show('modalInfoTache', function () {
            return tache;
        });
    },
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
    }
});

AutoForm.addHooks('tache', {
    after: {
        insert: function(error) {
            if (error) {
                console.log(error);
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
        },

        update: function(error) {
            if (error) {
                console.log(error);
                swal("Erreur", "Erreur a la mise à jour!", "error");
            } else {
                sweetAlert({
                    title: "Réussi !",
                    text: "La tâche à été modifié correctement",
                    type: "success",
                    confirmButtonText: "OK"
                }, function(){
                    Router.go(Utils.pathFor('tacheHome'))
                });
            }
        }
    }
},true);
