
Template.reponses.onDestroyed(function () {
    $(".fieldsetFormulaire").remove();
});

Template.reponses.onRendered(function () {
    Session.set("nbFichiers",0);
    $("#tableauReponses").hide();


});

Template.reponses.helpers({


    

    'Reponses': function(){
        

        var titres=[];

        data = reponsesForm.find().fetch();

        data.forEach(function(row) {

            var trouve = false;
            for(var d=0;d<titres.length;d++){
                if(titres[d]["_id"]==row.idForm){
                    trouve=true;
                }

            }
            if(trouve === false){
                var form = tempFormulaire.findOne({"_id":row.idForm});
                if(!_.isUndefined(form)) {
                    titres.push( {"_id" :row.idForm,"titre":tempFormulaire.findOne({"_id":row.idForm}).titre});
                }
            }

        });



        return titres;

    },
    'newFile':function(file){

        var tab = file.split("__");
        //console.log(tab[0].length);
        var newFile =file.substring((tab[0].length+2),file.length);
        console.log(newFile);
        return newFile;
    },
    "nombre":function(){
        return Session.get("nbReponses");

},
    "nombreFichiers":function(){
        return Session.get("nbFichiers");

    }


});

Template.reponses.events({

"click #btDownload ":function(){
  $(".allFilesDownload").click();

},
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
        function () {
            Meteor.call('deleteUploads', id, function (err, response) {
                if (err) {
                    swal("Echec!", "La suppression à echoué, raison :" + err, "error");
                    return;
                }
                swal("Suppression!", "Le fichier à été supprimé.", "success");
            });


        });
},

"change #selectLeForm ":function(){


    $(".divFichiers").hide();
    $("#divFichiers").html("");
    $(".optionFichiers").remove();
    $(".fieldsetFormulaire").remove();
    if($("#selectLeForm").val()==0){
        $("#tableauReponses").hide();
    }
    else {

        $("#tableauReponses").show();

        var affichage = "";
        var tabReponses = [];
        var fichier = false;

        reponses = reponsesForm.find({"idForm": $("#selectLeForm").val()});

        reponses.forEach(function (row) {

            tabReponses.push({"personne": row.idUser, "reponses": row.reponses});

        });
        var nbFichiers = Session.get("nbFichiers");
        Session.set("nbReponses",tabReponses.length);
        tabReponses.forEach(function (element) {

            var reps = "";
            var reponses = element.reponses;


            reponses.forEach(function (enr) {

                if (enr.type == 3) {
                    var dateFormat = moment(enr.reponse).format('DD-MM-YYYY');
                    reps += "<div class='row  panel-default'><div class=' col-md-6 panel-heading'>" + enr.label + "</div><div class='col-md-offset-1 col-md-4 panel-body'>" + dateFormat + "</div></div>";
                }
                else if (enr.type == 6) {

                reps += "<div class='row  panel-default'><div class=' col-md-6 panel-heading'>" + enr.label + "</div><div class='col-md-offset-1 col-md-4 panel-body'>";
                    divCheckbox="";
                    enr.reponse.forEach(function(checkbox){
                        divCheckbox+="<div><span> ("+checkbox.numero+") </span> "+checkbox.reponse+"</div>" ;
                    });
                 reps+=divCheckbox;
                 reps+="</div></div>";

                }
                else if (enr.type == 7) {


                  nbFichiers++;

                    Session.set("nbFichiers",nbFichiers);

                  reps += "<div class='row  panel-default'><div class=' col-md-6 panel-heading'>" + enr.label + "</div><div class='col-md-offset-1 col-md-4 panel-body'>Envoyé</div></div>";


                }
                else {
                    reps += "<div class='row  panel-default'><div class=' col-md-6 panel-heading'>" + enr.label + "</div><div class='col-md-offset-1 col-md-4 panel-body'>" + enr.reponse + "</div></div>";
                }

            });

            affichage += "<fieldset class='fieldsetFormulaire'><legend><span class='label label-info'>" + element.personne + "</span></legend></legend></legend>" + reps + "</fieldset><hr class='fieldsetFormulaire'>";

        });

        if(Session.get("nbFichiers")>0){

            var html ="";
            var documents = uploads.find({userId:$("#selectLeForm").val() }).fetch();

            documents.forEach(function(document){

            html+="<div class='col-md-3'><div class='panel panel-default'>"+
                    "<div class='panel-heading'><a href='/uploads/"+document.userId+"/"+newFile(document.file)+"' target='_BLANK'>"+newFile(document.file)+"</a></div>"+
                    "<div class='panel-footer clearfix'>Fichier "+displayExtension(document.file)+"<span class='pull-right'>"+
                   " <a href='/uploads/"+document.userId+"/"+newFile(document.file)+"' download='"+document.file+"' target='_parent' class='' btn btn-xs btn-success'>"+
                    "<span class='allFilesDownload glyphicon glyphicon-download'></span></a>"+
                    "<button class='btn btn-xs btn-danger delete_doc'>"+
                    "<span class='glyphicon glyphicon-trash'></span></button></span></div></div></div>";

               // console.log(document);

            });

            html+="<hr>";



            $("#divFichiers").html(html);

            $(".divFichiers").show();



        }


        $("#tableauReponses").after(affichage);

    }
}


    
});




//************************************************************ fonctions

newFile =function(file){

    var tab = file.split("__");
    //console.log(tab[0].length);
    var newFile =file.substring((tab[0].length+2),file.length);
    console.log(newFile);
    return newFile;
}

displayExtension = function (file) {
    return file.substr(file.length - 3);
}
