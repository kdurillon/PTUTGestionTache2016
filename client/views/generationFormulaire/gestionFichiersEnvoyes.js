Template.gestionFichiersEnvoyes.events({

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
    }
});


Template.gestionFichiersEnvoyes.helpers({
    'getFichiers':function(){
      //return uploads.find({userId:$("#selectLeForm").val() }).fetch();
      return uploads.find({userId:"7725NNZzbCNwDgDzC" }).fetch();
    },
    'newFile':function(file){

        var tab = file.split("__");
        //console.log(tab[0].length);
        var newFile =file.substring((tab[0].length+2),file.length);
        console.log(newFile);
        return newFile;
    }
    
});