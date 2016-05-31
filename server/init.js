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