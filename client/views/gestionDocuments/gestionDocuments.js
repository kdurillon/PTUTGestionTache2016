
Template.gestionDocuments.helpers({
    'List': function(){
        return uploads.find({userId: Meteor.userId()}).fetch();
    },


    isImg: function (file) {
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(file)[1];
        var img = ['jpg','jpeg','png','gif','bmp'];
        if($.inArray(ext,img) != -1){
            return true;
        }
        else{
            return false;
        }

    }

});

Template.gestionDocuments.events({
    'click .delete_doc': function() {
        var id = this._id;
        swal({
                title: "Etes vous sûr?",
                text: "Le fichier sera définitivement supprimé!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Oui",
                cancelButtonText: "Annuler",
                closeOnConfirm: false
            },
            function(){
                Meteor.call('deleteUploads', id, function(err,response) {
                    if(err) {
                        swal("Echec!", "La suppression à echoué, raison :"+err, "error");
                        return;
                    }
                    swal("Suppression!", "Le fichier à été supprimé.", "success");
                });


            });
    },
});
