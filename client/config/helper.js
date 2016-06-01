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
    return taches.find().fetch();
});

UI.registerHelper('getUpload', function() {
    return uploads.find().fetch();
});

UI.registerHelper('getUploadOption', function() {
    return uploads.find().map(function (c) {
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