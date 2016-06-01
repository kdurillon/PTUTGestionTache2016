


Template.reponses.helpers({

    'Reponses': function(){

        var titres=[];

        data = reponsesForm.find();

        data.forEach(function(row) {

            titres.push( tempFormulaire.findOne({"_id":row.idForm}));

        });

        //console.log(titres);

        return titres;

    }

});

Template.reponses.events({

"change #selectLeForm ":function(){

    var TabReponses=[];

    reponses = reponsesForm.find({"idForm":$("#selectLeForm").val()});

    reponses.forEach(function(row) {

        TabReponses.push({"personne":row.idUser,"reponses":row.reponses});

    });
    
    $("#tableauReponses").after("ok");
}


    
});


//************************************************************ fonctions
