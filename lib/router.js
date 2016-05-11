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

Router.route('/tacheMail', {
    name: "tacheMail",
    template: "tacheMail"
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
    name: 'mailingList'
});

Router.route('/category/update/:_id', function () {
    this.render('updateCategorie', {
        data: function () {
            console.log(this.params);
            return categories.findOne({_id: this.params._id});
        }
    });
}, {name: 'updateCategorie'});

Router.route('/formulaires', {
    name: 'formulaireGenere'
});

Router.route( 'pageNotFound', {
    name: "pageNotFound",
    path: '/(.*)',
    action: function() {
        this.render("error404");
    }
});