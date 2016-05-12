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