Meteor.startup(function () {
    Accounts.urls.resetPassword = function(token) {
        return Meteor.absoluteUrl('reset-password/' + token);
    };
    var smtp = {
        username: 'noreply-ptuttask@iutinfobourg.fr',
        password: 'METINET02',
        server:   'smtp.iutinfobourg.fr',
        port: 587
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    Meteor.methods({
        'sendEmail': function (to, from, subject, html) {
            check([to, from, subject, html], [String]);

            // Let other method calls from the same client start running,
            // without waiting for the email sending to complete.
            this.unblock();

            Email.send({
                to: to,
                from: from,
                subject: subject,
                html: html
            });
        }
    });
});
