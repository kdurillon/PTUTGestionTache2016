
Template.reponses.onDestroyed(function () {
    $(".fieldsetFormulaire").remove();
});

Template.reponses.onRendered(function () {
    $("#tableauReponses").hide();

});

Template.reponses.helpers({

    'Reponses': function(){
        

        //var titres=[{"_id":"xxx","titre":"xxx"}];
        var titres=[];

        data = reponsesForm.find().fetch();

       console.log(data);
       // console.log(titres);
        data.forEach(function(row) {

            var trouve=false;
            for(var d=0;d<titres.length;d++){
                if(titres[d]["_id"]==row.idForm){
                    trouve=true;
                }

            }
            console.log(trouve);
            if(trouve==false){
                titres.push( {"_id" :row.idForm,"titre":tempFormulaire.findOne({"_id":row.idForm}).titre});
            }

        });



        return titres;

    },
    "nombre":function(){
        return Session.get("nbReponses");

}

});

Template.reponses.events({

   

"change #selectLeForm ":function(){


    $(".fieldsetFormulaire").remove();
    if($("#selectLeForm").val()==0){
        $("#tableauReponses").hide();
    }
    else {



        $("#tableauReponses").show();

        var affichage = "";
        var tabReponses = [];

        reponses = reponsesForm.find({"idForm": $("#selectLeForm").val()});

        console.log("reponses :" + reponses);

        reponses.forEach(function (row) {

            tabReponses.push({"personne": row.idUser, "reponses": row.reponses});

        });

        Session.set("nbReponses",tabReponses.length);
        tabReponses.forEach(function (element) {

            var reps = "";
            var reponses = element.reponses;
            console.log(element.reponses);

            reponses.forEach(function (enr) {
                console.log(enr.label);
                if (enr.type == 3) {
                    var dateFormat = moment(enr.reponse, 'YYYY-MM-DD').format('DD-MM-YYYY');
                    reps += "<div class='row  panel-default'><div class=' col-md-6 panel-heading'>" + enr.label + "</div><div class='col-md-offset-1 col-md-4 panel-body'>" + dateFormat + "</div></div>";
                }
                else if (enr.type == 6) {

                //console.log("checkbox");

                reps += "<div class='row  panel-default'><div class=' col-md-6 panel-heading'>" + enr.label + "</div><div class='col-md-offset-1 col-md-4 panel-body'>";
                    divCheckbox="";
                    enr.reponse.forEach(function(checkbox){
                        divCheckbox+="<div><span> ("+checkbox.numero+") </span> "+checkbox.reponse+"</div>" ;
                        //console.log(checkbox[" numero "]);
                    });
                 reps+=divCheckbox;
                 reps+="</div></div>";

                }
                else {
                    reps += "<div class='row  panel-default'><div class=' col-md-6 panel-heading'>" + enr.label + "</div><div class='col-md-offset-1 col-md-4 panel-body'>" + enr.reponse + "</div></div>";
                }

            });

            affichage += "<fieldset class='fieldsetFormulaire'><legend><span class='label label-info'>" + element.personne + "</span></legend></legend></legend>" + reps + "</fieldset><hr class='fieldsetFormulaire'>";

        });

        //console.log(reps);

        $("#tableauReponses").after(affichage);

    }
}


    
});




//************************************************************ fonctions

