

Template.formulaireSupprime.rendered = function(data) {

   


};



Template.formulaireSupprime.helpers({



        'ModeleFormulaires': function(){

               // console.log(tempFormulaire.find({model:true}).fetch());
                 return tempFormulaire.find({model:true}).fetch();
        },

        'FormulairesGeneres': function(){

            return tempFormulaire.find({model:false,activation:true}).fetch();
        }
});

Template.formulaireSupprime.events({

    'click .trashModel': function (event) {

        swal({   title: "Etes vous sûr ?",
          text: "Ce modèle de formulaire sera définitivement supprimé !",
          type: "warning",
           showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Oui, supprimez-le !",
                cancelButtonText: "Annuler",
          closeOnConfirm: false }).then(
          function(isConfirm){
              if(isConfirm){
                 idForm = $("#selectFormModel").val();
                  tempFormulaire.remove({'_id':idForm});
                  swal("Supprimé !", "Le modèle de formulaire a été supprimé.", "success");
              }
          });



    },
    'click .trashForm': function (event) {

        swal({   title: "Etes vous sûr ?",
                text: "Ce formulaire ne sera plus consultable à moins de contacter un administrateur.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Oui, supprimez-le !",
                cancelButtonText: "Annuler",
                closeOnConfirm: false }).then(
                function(isConfirm){
                if(isConfirm){
                    idForm = $("#selectFormEnvoye").val();

                    tempFormulaire.update({'_id':idForm},{$set:{'activation':false}});
                    swal("Supprimé !", "Le modèle de formulaire a été supprimé.", "success");
                }
            });





    }
});


//************************************************************ fonctions

verificationEnvoiFichiers = function(){


    var tabUpload=Session.get("tabUpload");
    var verif = true;
    tabUpload.forEach(function(fichier){

        var repondu = uploads.find({"userId":Session.get("idForm"),"numElement":""+fichier,"EmailId": Session.get("idEmail")}).fetch();
        if(repondu.length==0){
        verif=false;
        }


    });

    if(verif){
        return true;
    }
    else{
        swal("Envoi(s)","Vous avez oublié d'envoyer un ou plusieurs fichiers","error");
        return false;
    }
    //console.log(verif);


}

