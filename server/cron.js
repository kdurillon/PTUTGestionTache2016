SyncedCron.add(
    {
        name: 'Rappel tache',
        schedule: function(parser) {
            // parser is a later.parse object
            return parser.text('every 1 day');
        },
        job: function() {
            return remindTache();
        }
    },
    {
        name: 'Finalisation des tâches',
        schedule: function(parser) {
            // parser is a later.parse object
            return parser.text('every 2 hours');
        },
        job: function() {
            return finalisationTache();
        }
},
    {
        name: 'Envoie de mail',
        schedule: function(parser) {
            // parser is a later.parse object
            return parser.text('every 2 hours');
        },
        job: function() {
            return envoiMailTache();
        }
});

//SyncedCron.start();

finalisationTache = function() {
    var now = moment();
    var listTaches = taches.find().fetch();
    _.each(listTaches, function(tache) {
        var dateFin = moment(tache.dateFin ,'DD/MM/YYYY - h:mm');
        if(now > dateFin) {
            taches.update(tache._id, {$set: { fini: true }});
        }
    });
};

envoiMailTache = function() {
    var listTaches = taches.find().fetch();
};

remindTache = function() {
    var tomorrow = moment().add(1, 'days').format('DD/MM/YYYY');
    var listTaches = taches.find().fetch();
    _.each(listTaches, function(tache) {
        var user = Meteor.users.findOne({_id: tache.userId});
        var dateFin = moment(tache.dateFin,'DD/MM/YYYY').format('DD/MM/YYYY');
        if(tomorrow === dateFin) {
            Meteor.call('sendEmail',user.emails[0].address,'noreply-ptuttask@iutinfobourg.fr','Rappel tâche : '+tache.titre,'Bonjour,<br/>La tache suivante doit être terminée demain : ' + tache.titre)
        }
    });
};