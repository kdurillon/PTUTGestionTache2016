SyncedCron.add(
    {
        name: 'Mail tache',
        schedule: function(parser) {
            // parser is a later.parse object
            return parser.text('every 1 min');
        },
        job: function() {
            return envoiMailTache();
        }
    },
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

SyncedCron.start();

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

genLienForm = function(id,email) {
    var tache = taches.findOne({_id: id});
        var lien = null;
        if(tache.typeTache === "formulaire") {
            lien = Meteor.absoluteUrl("/formulaire/" + tache.formulaire + "/" + base64(email));
        }else if(tache.typeTache === "document") {
            lien = Meteor.absoluteUrl("/uploads/"+tache.document.userId+"/"+tache.document.file);
        }
        return lien;
    };

envoiMailTache = function() {
    var listTaches = taches.find().fetch();
    var now=moment().format('DD/MM/YYYY - h:mm');
    _.each(listTaches, function(tache) {
        var dateFin = moment(tache.dateFin ,'DD/MM/YYYY - h:mm').format('DD/MM/YYYY - h:mm');
        console.log(dateFin);
        if(now === dateFin) {
            console.log('passe');
            if(tache.typeTache == 'mail' || tache.typeTache == 'document' || tache.typeTache == 'formulaire'){
                if(tache.typeTache != 'mail'){
                    _.each(tache.emails,function(email){
                        var lien = genLienForm(tache._id,email);
                        console.log(lien);
                        Meteor.call('sendEmail',email,'noreply-ptuttask@iutinfobourg.fr','Lien : ' + tache.titre,tache.contenu + lien)
                    })

                }
            }
        }
    });
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