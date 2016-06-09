Template.login.rendered = function() {
    $('#formLogin').validator();
};

Template.login.events({
    "submit form": function(event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();

            var email = $('[name=email_login]').val();
            var password = $('[name=password_login]').val();

            Meteor.loginWithPassword(email, password, function(err) {
                if (err) {
                    swal("Erreur", "Email ou mot de passe incorrect!", "error");
                }
            });

            Router.go(Utils.pathFor('home'));
        }else {
            var route = Utils.pathFor('forgotpassword');
            swal({
                title: 'Erreur',
                type: 'error',
                html: "<h3>Formulaire invalide</h3>" +
                "<a href='"+route+"'>Mot de passe oublié ?</a>"
            })
        }
    }
});
