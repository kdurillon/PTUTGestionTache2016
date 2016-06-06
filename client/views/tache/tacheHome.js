i18n.setLanguage('fr');

/**
 * rendered
 */
Template.actionTableTache.rendered = function() {
    $('[data-toggle="tooltip"]').tooltip();
};

/**
 * helpers
 */
Template.tacheHome.helpers({
    optionsReactiveTable: function() {
        return {
            fields: [
                { key: 'titre', label: 'Titre', fn: function(value) { return displayValueTable(value) } },
                { key: 'typeTache', label: 'Type', fn: function(value) { return displayValueTable(value) } },
                { key: 'tacheParent', label: 'Parent', fn: function(value) { return displayValueTable(value) } },
                { key: 'categorie', label: 'Catégorie', fn: function(value) { return displayValueTable(value) } },
                { key: 'tags', label: 'Tags', fn: function(value) { return displayValueTable(value) } },
                { key: 'dateCreation', label: 'Date de création', fn: function(value) { return displayValueTable(value) } },
                { key: 'dateFin', label: 'Date de fin/rappel', fn: function(value) { return displayValueTable(value) } },
                { label: 'Action', tmpl: Template.actionTableTache, sortable: false }
            ],
            rowClass: function(item) {
                if(item.typeTache === "parent") {
                    return 'text-bold';
                }

                var now = moment();
                var dateFin = moment(item.dateFin ,'MM/DD/YYYY - h:mm');

                if((now > dateFin) || item.fini === true) {
                    return 'lightgrey';
                }
            }
        }
    }
});

function displayValueTable(value) {
    if(_.isEmpty(value)) {
        return new Spacebars.SafeString("Aucune valeur défini");
    }else {
        return value;
    }
}

Template.actionTableTache.helpers({
    mailExist: function (_id) {
        var tache = taches.findOne({_id: _id});
        return !(_.isUndefined(tache.emails) && _.isUndefined(tache.mailingList));
    }
});

/**
 * Events
 */
Template.tacheHome.events({
    "click .mail_tache": function() {
        var tache = getTache(this._id);

        var html = '';
        if(tache.typeTache === "document") {
            html = tache.contenu;
            html+= "<br>Voici le lien du document : "+window.location.origin+"/"+uploads+"/"+document.userId+"/"+document.file;
        } else {
            html = tache.contenu;
        }
        Meteor.call('sendEmail',
            'fakedeviut@gmail.com',
            tache.emails.toString(),
            tache.titre,
            "Ceci est un test de l'envoi de mail");
        swal({
            title: "Envoi de mail",
            text: "Email envoyé aux emails de la tâche.",
            html: true,
            type: "success"
        });
    },
    "click .info_tache": function() {
        var _id = this._id;
        Modal.show('modalInfoTache', function () {
            return getTache(_id);
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
                swal("Suppression!", "La tâche à été supprimé avec succès.", "success");
            });
    }
});

Template.modalInfoTache.events({
    "click .archive_tache": function() {
        taches.update(this._id, {$set: { fini: true }});
        swal("Archivage!", "La tâche à été archivé avec succès.", "success");
    }
});

/**
 * Hooks
 */
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