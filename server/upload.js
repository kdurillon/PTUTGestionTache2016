Meteor.startup(function () {
    UploadServer.init({
        tmpDir: process.cwd() + '/../../../../../public/uploads/tmp',
        uploadDir: process.cwd() + '/../../../../../public/uploads/',
        checkCreateDirectories: true, //create the directories for you
        getDirectory: function (fileInfo, formData) {
            return formData.currentUserId + "/";
        },
        finished: function(file, formFields) {
            var newFile=formFields.currentEmailId+"__"+file.name;
            uploads.insert({userId: formFields.currentUserId,EmailId:formFields.currentEmailId,numElement: formFields.currentElmtId,file: newFile});
        }
    });

    Meteor.methods({
        'deleteUploads': function(_id) {
            var upload = uploads.findOne({_id: _id});
            UploadServer.delete(upload.userId+'/'+upload.file);
            uploads.remove({_id: _id});
        },

        'getUserId': function() {
            return this.userId;
        }


    });

});