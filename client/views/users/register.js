Template.register.rendered = function() {
    $('#formRegister').validator();
};

Template.register.events({
    'submit form': function(event){
        if (!event.isDefaultPrevented()) {
            event.preventDefault();

            var email = $('[name=email_register]').val();
            var password = $('[name=password_register]').val();

            Accounts.createUser({
                email: email,
                password: password
            });

            Router.go(Utils.pathFor('home'));
        }
    }
});