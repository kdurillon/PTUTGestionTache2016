SyncedCron.add(
    {
        name: 'Mail tache',
        schedule: function(parser) {
            // parser is a later.parse object
            return parser.text('every 10 seconds');
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

base64= function (str){
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
        return Base64.encode(str);
}

genLienForm = function(id,email) {
    var tache = taches.findOne({_id: id});
        var lien = null;
        if(tache.typeTache === "formulaire") {
            lien = 'http://localhost:3000' + "/formulaire/" + tache.formulaire + "/" + base64(email);
        }else if(tache.typeTache === "document") {
            lien = 'http://localhost:3000'+"/uploads/"+tache.document.userId+"/"+tache.document.file;
        }
        return lien;
    };

envoiMailTache = function() {
    var listTaches = taches.find().fetch();
    var now=moment().format('DD/MM/YYYY - h:mm');
    console.log(now);
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