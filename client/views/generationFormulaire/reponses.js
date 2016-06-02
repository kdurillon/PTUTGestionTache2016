
Template.reponses.onDestroyed(function () {
    $(".fieldsetFormulaire").remove();
});

Template.reponses.helpers({

    'Reponses': function(){

        var titres=[];

        data = reponsesForm.find().fetch();

        console.log(data);

        data.forEach(function(row) {

            //console.log(row);

            //titres.push( "_id" :tempFormulaire.findOne({"_id":row.idForm}));

        });

       //console.log(titres);

        var uniqueList = _.uniq(titres,titres["_id"]);
       // console.log(uniqueList);

        return uniqueList;

    }

});

Template.reponses.events({

"change #selectLeForm ":function(){

    $(".fieldsetFormulaire").remove();

    var affichage="";
    var tabReponses=[];

    reponses = reponsesForm.find({"idForm":$("#selectLeForm").val()});

    console.log("reponses :" +reponses);

    reponses.forEach(function(row) {

        tabReponses.push({"personne":row.idUser,"reponses":row.reponses});

    });


    tabReponses.forEach(function(element){

        var reps="";
        var reponses=element.reponses;
        console.log(element.reponses);

        reponses.forEach(function(enr){
            console.log(enr.label);
            reps+="<div class='row'><div class='col-md-offset-2 col-md-4'>"+enr.label+"</div><div class='col-md-offset-1 col-md-4'>"+enr.reponse+"</div></div>";
        });

        affichage+="<fieldset class='fieldsetFormulaire'><legend><u>"+element.personne+"</u></legend></legend></legend>"+reps+"</fieldset>";

    });

    //console.log(reps);

    $("#tableauReponses").after(affichage);
}


    
});




//************************************************************ fonctions

