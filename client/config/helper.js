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

UI.registerHelper('getTache', function() {
    return taches.find().fetch();
});

UI.registerHelper('getCategorie', function() {
    return categories.find().fetch();
});

UI.registerHelper('getMailingList', function() {
    return mailingList.find().fetch();
});

UI.registerHelper('getCategorieOption', function() {
    return categories.find().map(function (c) {
        return {label: c.nom, value: c.nom};
    });
});

UI.registerHelper('getMailingListOption', function() {
    return mailingList.find().map(function (c) {
        return {label: c.nom, value: c.nom};
    });
});