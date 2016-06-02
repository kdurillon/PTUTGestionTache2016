Template.reponses.helpers({

    'Reponses': function(){

        var titres=[];

        data = reponsesForm.find();

        //console.log

        data.forEach(function(row) {

            titres.push( tempFormulaire.findOne({"_id":row.idForm}));
            /*titres.forEach(function(titre){
                console.log(row.idForm);
                if(tempFormulaire.findOne({"_id":row.idForm})==titre){
                    console.log(titre);
                   titre.next();
                }
                else{
                    titres.push( tempFormulaire.findOne({"_id":row.idForm}));
                }*/




        });


        console.log(titres);

        return titres;

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
