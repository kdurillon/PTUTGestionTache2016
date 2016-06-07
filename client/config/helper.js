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

utf8_to_b64 = function( str ) {
    return window.btoa(decodeURI(encodeURIComponent( str )));
};

b64_to_utf8 = function( str ) {
    return decodeURIComponent(encodeURI(window.atob( str )));
};

getTache = function (_id) {
    var tache = taches.findOne({_id: _id});

    if(_.isUndefined(tache.emails)) {
        tache.emails = [];
    }

    _.each(tache.mailingList, function(nom) {
        var emails = mailingList.findOne({nom: nom}).emails;
        tache.emails = tache.emails.concat(emails);
    });

    var document = uploads.findOne({_id: tache.document});

    if(!_.isUndefined(document)) {
        tache.document = document;
    }

    tache.emails = _.uniq(tache.emails);

    return tache;
};