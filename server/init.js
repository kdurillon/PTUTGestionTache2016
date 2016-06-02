Meteor.startup(function () {
    UploadServer.init({
        tmpDir: process.cwd() + '/../../../../../public/uploads/tmp',
        uploadDir: process.cwd() + '/../../../../../public/uploads/',
        checkCreateDirectories: true, //create the directories for you
        getDirectory: function (fileInfo, formData) {
            return formData.currentUserId + "/";
        },
        finished: function(file, formFields) {
            uploads.insert({userId: formFields.currentUserId, file: file.name});
        }
    })


Meteor.methods({deleteUploads: function(_id){
            var upload = uploads.findOne({_id: _id});
            UploadServer.delete(upload.userId+'/'+upload.file);
            uploads.remove({_id: _id});
}});

});