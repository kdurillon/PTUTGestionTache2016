
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
                titres.push( {"_id" :row.idForm,"titre":tempFormulaire.findOne({"_id":row.idForm}).titre});
            }

        });



        return titres;

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

"change #selectLeForm ":function(){


    $(".divFichiers").hide();
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

        Session.set("nbReponses",tabReponses.length);
        tabReponses.forEach(function (element) {

            var reps = "";
            var reponses = element.reponses;


            reponses.forEach(function (enr) {

                if (enr.type === 3) {
                    var dateFormat = moment(enr.reponse).format('DD-MM-YYYY');
                    reps += "<div class='row  panel-default'><div class=' col-md-6 panel-heading'>" + enr.label + "</div><div class='col-md-offset-1 col-md-4 panel-body'>" + dateFormat + "</div></div>";
                }
                else if (enr.type === 6) {

                reps += "<div class='row  panel-default'><div class=' col-md-6 panel-heading'>" + enr.label + "</div><div class='col-md-offset-1 col-md-4 panel-body'>";
                    divCheckbox="";
                    enr.reponse.forEach(function(checkbox){
                        divCheckbox+="<div><span> ("+checkbox.numero+") </span> "+checkbox.reponse+"</div>" ;
                    });
                 reps+=divCheckbox;
                 reps+="</div></div>";

                }
                else if (enr.type === 7) {

                  fichier=true;
                    //template.gestionFichiersEnvoyes
                    //template.gestionFichiersEnvoyes.create();
                    //Blaze.render(Template.gestionFichiersEnvoyes.view);
                    //Blaze.render(Template.gestionFichiersEnvoyes,#tableauReponses);


                    // Blaze.render(Blaze.With(data, function () { return Template.reponses.gestionFichiersEnvoyes; })).
                  reps += "<div class='row  panel-default'><div class=' col-md-6 panel-heading'>" + enr.label + "</div><div class='col-md-offset-1 col-md-4 panel-body'>Envoyé</div></div>";


                }
                else {
                    reps += "<div class='row  panel-default'><div class=' col-md-6 panel-heading'>" + enr.label + "</div><div class='col-md-offset-1 col-md-4 panel-body'>" + enr.reponse + "</div></div>";
                }

            });

            affichage += "<fieldset class='fieldsetFormulaire'><legend><span class='label label-info'>" + element.personne + "</span></legend></legend></legend>" + reps + "</fieldset><hr class='fieldsetFormulaire'>";

        });

        if(fichier){
            var selectFichiers="";
            var idForm = $("#selectLeForm").val();
            var documents = uploads.find({"userId":idForm}).fetch();
            var nb=0;
            documents.forEach(function(document){
                nb++;
                selectFichiers+="<option class='optionFichiers'>"+document.file+"</option>";
            });
            Session.set("nbFichiers",nb);
            $(".divFichiers").show();
            $("#selectFichier").html(selectFichiers);
        }


        $("#tableauReponses").after(affichage);

    }
}


    
});




//************************************************************ fonctions

