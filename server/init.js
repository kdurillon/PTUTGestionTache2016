Meteor.startup(function () {
    UploadServer.init({
        tmpDir: process.cwd() + '/../../../../../public/uploads/tmp',
        uploadDir: process.cwd() + '/../../../../../public/uploads/',
        checkCreateDirectories: true, //create the directories for you
        getDirectory: function (fileInfo, formData) {
            return formData.currentUserId + "/";
        },
        finished: function(file, formFields) {
            uploads.insert({userId: formFields.currentUserId, file: file.name, date: formFields.currentDate});
        }
    })
});

Meteor.methods({
    sendEmail: function (to, from, subject, text) {
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