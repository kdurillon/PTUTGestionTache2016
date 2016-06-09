Template.forgotPassword.rendered = function() {
    swal.close();
};

Template.forgotPassword.events({
    'submit #forgotPasswordForm': function(e, t) {
        e.preventDefault();

        var forgotPasswordForm = $(e.currentTarget),
            email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());

        if (!_.isEmpty(email) && validationMail(email)) {

            Accounts.forgotPassword({email: email}, function(err) {
                if (err) {
                    if (err.message === 'User not found [403]') {
                        swal("Cet utilisateur n'existe pas!");
                    } else {
                        swal("Nous sommes désolés, une erreur s'est produite!");
                    }
                } else {
                    swal('Email envoyé, verifier votre messagerie électronique!');
                    Router.go(Utils.pathFor('gantt'));
                }
            });

        }
        return false;
    }
});

Template.resetPassword.helpers({
    resetPassword: function(){
        var token = Router.current().params['token'];
        Session.set('resetPassword', token);
        return Session.get('resetPassword');
    }
});

Template.resetPassword.events({
    'submit #resetPasswordForm': function(e, t) {
        e.preventDefault();

        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPasswordPassword').val(),
            passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

        if(password !== passwordConfirm) {
            swal("Les mots de passes ne correspondent pas!");
        }

        if (!_.isEmpty(password)) {
            Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
                if (err) {
                    console.log(err);
                    swal("Nous sommes désolés, une erreur s'est produite!");
                } else {
                    swal("Votre mot de passe a correctement été changé!");
                    Session.set('resetPassword', null);
                    Router.go(Utils.pathFor('gantt'));
                }
            });
        }
        return false;
    }
});