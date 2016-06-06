Meteor.startup(function () {
    smtp = {
        username: 'noreply-ptuttask@iutinfobourg.fr',
        password: 'METINET02',
        server:   'smtp.iutinfobourg.fr',
        port: 587
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    Meteor.methods({
        'sendEmail': function (to, from, subject, text) {
            check([to, from, subject, text], [String]);

            // Let other method calls from the same client start running,
            // without waiting for the email sending to complete.
            this.unblock();

            Email.send({
                to: to,
                from: from,
                subject: subject,
                text: text
            });
        }
    });
});
