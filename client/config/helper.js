UI.registerHelper('getGlobal', function(varName) {
    return Globals[varName];
});

UI.registerHelper('setTitle', function(title){
    if(!title){
        title = Globals.appName;
    }
    else{
        title += " - " + Globals.appName;
    }
    document.title = title;
});

UI.registerHelper('isImg', function (file) {
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(file)[1];
    var img = ['jpg','jpeg','png','gif','bmp'];
    if($.inArray(ext,img) != -1){
        return true;
    }
    else{
        return false;
    }
});

UI.registerHelper('displayExtension', function (file) {
    return file.substr(file.length - 3);
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

/**
 * Permet de récupérer les données de la collection
 */
UI.registerHelper('getTache', function() {
    return taches.find({userId: Meteor.userId()}).fetch();
});
UI.registerHelper('getTache', function() {
    return taches.find({userId: Meteor.userId()}).fetch();
});

UI.registerHelper('getTacheParent', function() {
    return taches.find({userId: Meteor.userId(), typeTache: "parent"}).fetch();
});

UI.registerHelper('getTacheParentOption', function() {
    return taches.find({userId: Meteor.userId(), typeTache: "parent"}).map(function (c) {
        return {label: c.titre, value: c._id};
    });
});

UI.registerHelper('getUpload', function() {
    return uploads.find({userId: Meteor.userId()}).fetch();
});

UI.registerHelper('getUploadOption', function() {
    return uploads.find({userId: Meteor.userId()}).map(function (c) {
        return {label: c.file, value: c._id};
    });
});

UI.registerHelper('getCategorie', function() {
    return categories.find().fetch();
});

UI.registerHelper('getCategorieOption', function() {
    return categories.find().map(function (c) {
        return {label: c.nom, value: c.nom};
    });
});

UI.registerHelper('getMailingList', function() {
    return mailingList.find().fetch();
});

UI.registerHelper('getMailingListOption', function() {
    return mailingList.find().map(function (c) {
        return {'label': c.nom, 'value': c.nom};
    });
});

UI.registerHelper('getFormulaire', function() {
    return tempFormulaire.find().fetch();
});

UI.registerHelper('getFormulaireOption', function() {
    return tempFormulaire.find().map(function (c) {
        return {'label': c.titre, 'value': c._id};
    });
});

base64= function (str,mode){
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    if(mode=="encode"){
        return Base64.encode(str);
    }
    if(mode=="decode"){
        return Base64.decode(str);
    }
}



utf8_to_b64 = function( str ) {
    return window.btoa(decodeURI(encodeURIComponent( str )));
};

b64_to_utf8 = function( str ) {
    return decodeURIComponent(encodeURI(window.atob( str )));
};

getTache = function (_id) {
    var tache = taches.findOne({_id: _id});
    var document = uploads.findOne({_id: tache.document});

    if(_.isUndefined(tache.emails)) {
        tache.emails = [];
    }

    if(!_.isUndefined(tache.document)) {
        tache.document = document;
    }

    _.each(tache.mailingList, function(nom) {
        var emails = mailingList.findOne({nom: nom}).emails;
        tache.emails = tache.emails.concat(emails);
    });

    tache.emails = _.uniq(tache.emails);

    return tache;
};