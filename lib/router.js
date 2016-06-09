Router.configure({
    layoutTemplate: "mainLayout"
});

Router.onBeforeAction(function() {

    if (!Meteor.userId()) { // Si l'utilisateur n'est pas connecté, on lui affiche le formulaire de login
        this.render("login");
    } else {
        this.next(); // Sinon, la requête continue normalement
    }

}, {
    except: [
        "home", "pageNotFound", "login", "register", "formulaireGenere"
    ]
});

Router.route('/', {
    name: "home",
    template: "home"
});

Router.route('/login', {
    name: "login",
    template: "login"
});

Router.route('/register', {
    name: "register",
    template: "register"
});

Router.route('/tache', {
    name: "tacheHome",
    template: "tacheHome",
    waitOn: function(){
        return Meteor.subscribe('getAllUser');
    }
});

Router.route('/tache/parent', {
    name: "newTacheParent",
    template: "newTacheParent"
});

Router.route('/tache/parent/edit/:_id', {
    name: "updateTacheParent",
    template: "updateTacheParent",
    data: function() {
        return taches.findOne({_id: this.params._id});
    }
});

Router.route('/tache/mail', {
    name: "newTacheMail",
    template: "newTacheMail"
});

Router.route('/tache/mail/edit/:_id', {
    name: "updateTacheMail",
    template: "updateTacheMail",
    data: function() {
        return taches.findOne({_id: this.params._id});
    }
});

Router.route('/tache/note', {
    name: "newTacheNote",
    template: "newTacheNote"
});

Router.route('/tache/note/edit/:_id', {
    name: "updateTacheNote",
    template: "updateTacheNote",
    data: function() {
        return taches.findOne({_id: this.params._id});
    }
});

Router.route('/tache/document', {
    name: "newTacheDocument",
    template: "newTacheDocument"
});

Router.route('/tache/document/edit/:_id', {
    name: "updateTacheDocument",
    template: "updateTacheDocument",
    data: function() {
        return taches.findOne({_id: this.params._id});
    }
});

Router.route('/tache/formulaire', {
    name: "newTacheFormulaire",
    template: "newTacheFormulaire"
});

Router.route('/tache/formulaire/edit/:_id', {
    name: "updateTacheFormulaire",
    template: "updateTacheFormulaire",
    data: function() {
        return taches.findOne({_id: this.params._id});
    }
});

Router.route('/category', {
    name: "categoriesHome",
    template: "categoriesHome"
});

Router.route('/category/new', {
    name: "newCategorie",
    template: "newCategorie"
});

Router.route('/mailinglist', {
    name: 'mailingList',
    template: "mailingList"
});

Router.route('/category/update/:_id', {
    name: 'updateCategorie',
    template: "updateCategorie",
    data: function () {
        return categories.findOne({_id: this.params._id});
    }
});

Router.route('/formulaires', {
    name: 'formulaireCree',
    template: "formulaireCree"
});

Router.route('/reponses', {
    name: 'reponses',
    template: "reponses"
});

Router.route('/formulaire/:_id/:mailEncode', {
    name: 'formulaireGenere',
    template: "formulaireGenere"

});

Router.route('/documents', {
    name: 'gestionDocuments',
    template: "gestionDocuments"
});

Router.route('/gantt', {
    name: "gantt",
    template: "gantt"
});

Router.route( '/error404', {
    path: '/(.*)',
    name: "error404",
    template: "error404"
});

