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
        "home", "pageNotFound", "login", "register"
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
    template: "tacheHome"
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


Router.route( 'pageNotFound', {
    name: "pageNotFound",
    path: '/(.*)',
    action: function() {
        this.render("error404");
    }
});