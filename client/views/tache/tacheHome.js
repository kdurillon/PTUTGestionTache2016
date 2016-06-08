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
                { key: 'titre', label: 'Titre' },
                { key: 'typeTache', label: 'Type' },
                { key: 'tacheParent.titre', label: 'Parent' },
                { key: 'categorie', label: 'Catégorie' },
                { key: 'tags', label: 'Tags' },
                { key: 'dateCreation', label: 'Date de création' },
                { key: 'dateFin', label: 'Date de fin/rappel' },
                { label: 'Action', tmpl: Template.actionTableTache, sortable: false, cellClass: 'text-right' }
            ],
            rowClass: function(item) {
                var now = moment();
                var dateFin = moment(item.dateFin ,'DD/MM/YYYY - h:mm');

                if((now > dateFin) || item.fini === true) {
                    return 'lightgrey';
                }
            }
        }
    }
});

/*function displayValueTable(value) {
    if(_.isEmpty(value)) {
        return new Spacebars.SafeString("");
    }else {
        return value;
    }
}*/

Template.actionTableTache.helpers({
    mailExist: function (_id) {
        var tache = taches.findOne({_id: _id});
        if(_.isUndefined(tache)) {
            return false;
        }
        return !(_.isUndefined(tache.emails) && _.isUndefined(tache.mailingList));
    },

    tacheEnCours: function(_id) {
        var tache = taches.findOne({_id: _id});
        if(_.isUndefined(tache)) {
            return false;
        }
        return tache.fini === false;
    }
});

/**
 * Events
 */
Template.tacheHome.events({
    "click .mail_tache": function() {
        var tache = getTache(this._id);

        swal({
            title: "Envoi de mail",
            text: "Email envoyé aux emails de la tâche.",
            html: true,
            type: "success"
        });

        _.each(tache.emails, function(email) {
            var lien = null;
            if(tache.typeTache === "formulaire") {
                lien = window.location.origin + "/formulaire/" + tache.formulaire + "/" + utf8_to_b64(email);
            }else if(tache.typeTache === "document") {
                lien = window.location.origin+"/uploads/"+tache.document.userId+"/"+tache.document.file;
            }
            var dataContext = {
                contenu: tache.contenu,
                lien: lien
            };
            var html=Blaze.toHTMLWithData(Template.emailTemplate,dataContext);
            Meteor.call('sendEmail',
                'noreply-ptuttask@iutinfobourg.fr',
                email,
                tache.titre,
                html);
        });
    },
    "click .info_tache": function() {
        var _id = this._id;
        Modal.show('modalInfoTache', function () {
            return getTache(_id);
        });
    },
    "click .archive_tache": function() {
        if(this.typeTache === "parent") {
            var listTaches = taches.find({tacheParent: this._id}).fetch();
            _.each(listTaches, function(tache) {
                taches.update(tache._id, {$set: { fini: true }});
            });
        }
        taches.update(this._id, {$set: { fini: true }});
        gantt.deleteTask(id);
        swal("Archivage!", "La tâche à été archivé avec succès.", "success");
    },

    "click .desarchive_tache": function() {
        if(this.typeTache === "parent") {
            var listTaches = taches.find({tacheParent: this._id}).fetch();
            _.each(listTaches, function(tache) {
                taches.update(tache._id, {$set: { fini: false }});
            });
        }
        taches.update(this._id, {$set: { fini: false }});
        swal("Archivage!", "La tâche à été enlevé de l'archive.", "success");
    },

    "click .partage_tache": function() {
        var id = this._id;
        swal({
            title: "Voulez-vous vraiment partager cette tâche ?",
            text: "Votre tâche sera partagé avec les autres membres qui pourront ensuite y apporter des modifications!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, partagez!",
            closeButtonText: "Non",
            closeOnConfirm: false,
            reverseButtons: true
        }).then(function(){
            //taches.update(id, {$set: {}});
            swal("Tâche partagée!", "Votre tâche à été partagée.", "success");
        });
    }

});

Template.modalInfoTache.events({
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
                gantt.deleteTask(id);
                swal("Suppression!", "La tâche à été supprimé avec succès.", "success");
            });
    }
});

/**
 * Hooks
 */
AutoForm.addHooks('tache', {
    before: {
        insert: function(data){
            data.typeTache = Session.get('typeTache');

            if(!_.isUndefined(data.tacheParent)) {
                var tacheParent = taches.findOne({_id: data.tacheParent});
                data.tacheParent = {
                    _id: tacheParent._id,
                    titre: tacheParent.titre
                };
            }
            return data;
        }
    },
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