i18n.setLanguage('fr');

Template.actionTableTache.rendered = function() {
    $('[data-toggle="tooltip"]').tooltip();
};

Template.tacheHome.helpers({
    optionsReactiveTable: function() {
        return { fields: [
            { key: 'titre', label: 'Titre' },
            { key: 'typeTache', label: 'Type' },
            { key: 'categorie', label: 'Catégorie' },
            { key: 'tags', label: 'Tags' },
            { key: 'dateCreation', label: 'Date de création' },
            { key: 'dateFin', label: 'Date de fin/rappel' },
            { label: 'Action', tmpl: Template.actionTableTache, sortable: false }
        ] }
    }
});

Template.actionTableTache.helpers({
    mailExist: function (_id) {
        var tache = taches.findOne({_id: _id});
        if(_.isUndefined(tache.emails) && _.isUndefined(tache.mailingList)) {
            return false;
        }
        return true;
    }
});

function getAllEmailsTache(_id) {
    var tache = taches.findOne({_id: _id});
    var mailinglist = mailingList.findOne({nom: tache.mailingList});

    if(!_.isUndefined(mailinglist)) {
        if(_.isUndefined(tache.emails)) {
            tache.emails = mailinglist.emails;
        }else {
            tache.emails = _.uniq(tache.emails.concat(mailinglist.emails));
        }
    }

    return tache;
}

Template.tacheHome.events({
    "click .mail_tache": function() {
        var emails = getAllEmailsTache(this._id).emails;
        Meteor.call('sendEmail',
            'fakedeviut@gmail.com',
            emails.toString(),
            'Envoie de mail!',
            "Ceci est un test de l'envoi de mail");
        var html = '<ul>';
        _.each(emails, function(email) {
            html+= '<li>'+email+'</li>';
        });
        html+='</ul>';
        swal({
            title: "Envoi de mail",
            text: "Email envoyé à "+html,
            html: true,
            type: "success"
        });
    },
    "click .info_tache": function() {
        var _id = this._id;
        Modal.show('modalInfoTache', function () {
            return getAllEmailsTache(_id);
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
