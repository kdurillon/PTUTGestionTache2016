Template.formulaireGenere.rendered = function(data) {

    tinymce.init({
        selector: 'textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        language: 'fr_FR'
    });

    Session.set("nbElementForm",0);
    Session.set("ckboxgroup",[]);

    var idFormulaire =Router.current().params;

    var formulaire = tempFormulaire.find({_id:""+idFormulaire["_id"]}).fetch();

    console.log(formulaire);

    $(".navbar").hide();

};



Template.formulaireGenere.helpers({
   
    'Form': function(){

        var idFormulaire =Router.current().params;

        console.log(tempFormulaire.find({_id:""+idFormulaire["_id"]}).fetch());

        return tempFormulaire.find({_id:""+idFormulaire["_id"]}).fetch();
    },
    'isInputText': function(display){
        if(display=="1"){

            return true;
        }
        return false;
    },
    'isTextArea': function(display){
        if(display=="2"){

            return true;
        }
        return false;
    },
    'isInputDate': function(display){
        if(display=="3"){

            return true;
        }
        return false;
    },
    'isInputChoixBinaire': function(display){
        if(display=="4"){

            return true;
        }
        return false;
    },
    'isInputRadios': function(display){
        if(display=="5"){
            Session.set("NumeroReps",0);
            return true;
        }
        return false;
    },
    'isInputCheckboxs': function(display){
        if(display=="6"){

            Session.set("NumeroReps",0);

            return true;
        }
        return false;
    },
    'isInputUpload': function(display){
        if(display=="7"){
            
            return true;
        }
        return false;
    }
});

Template.formulaireGenere.events({

    'click .upload_button': function () {
        Modal.show('uploadModalExt');
    },
    'submit form': function (event) {

        event.preventDefault();


        var idFormulaire =Router.current().params;
        var idUser=idFormulaire["idUtilisateur"];
        var idForm=idFormulaire["_id"];

        var reps=tableauReponses(idForm,idUser);
        var tabCkBox =Session.get("ckboxgroup");
        var verif = false;

        console.log(tabCkBox);

        for(var a=0;a<tabCkBox.length;a++){
            verif = false;
            for(var b=1;b<=tabCkBox[a]["nbReponses"];b++){
                if($("#checkboxname"+tabCkBox[a]["element"]+"-"+b).is(":checked")){
                verif=true;
                }
            if(!verif){
                $(".errorCkBox"+b).show();
            }
            }


         if(verif){

             reponsesForm.insert({"idForm":idForm,"idUser":idUser,"reponses":reps});
             swal("Réussite","Formulaire envoyé !","success");

             $("#corpsForm").hide();
             $("#retour").show();

         }
            else{
             Session.set("ckboxgroup",[]);


         }




        }


    }

    
});


//************************************************************ fonctions



tableauReponses= function(idForm,idUser){

    var numElmt=Session.get("nbElementForm");
    numElmt++;
    var numElmt=Session.set("nbElementForm",numElmt);

    var form =tempFormulaire.findOne(idForm);

    var reps=[];
    for (var i=0 ; i < form.controls.length ; i++){

        var type =form.controls[i].control[0].typeControl;
        var reponses =form.controls[i].control[0].reponses;
        var  num=i+1;

        if(type==1){
            reps.push({"num":numElmt,"type":type,"label":form.controls[i].control[0].label,"reponse":$("#inputText"+num).val()});
        }
        if(type==2){
            reps.push({"num":numElmt,"type":type,"label":form.controls[i].control[0].label,"reponse":$("#textArea"+num).val()});
        }
        if(type==3){
            reps.push({"num":numElmt,"type":type,"label":form.controls[i].control[0].label,"reponse":$("#date"+num).val()});
        }
        if(type==4){
            if($("#radio"+num).is(":checked")){
                reps.push({"num":numElmt,"type":type,"label":form.controls[i].control[0].label,"reponse":"oui"});
            }
            else{
                reps.push({"num":numElmt,"type":type,"label":form.controls[i].control[0].label,"reponse":"non"});
            }
         }
        if(type==5){
            var rep="";
            for(var j=0; j<reponses.length;j++){
                var numero=j+1;
                if($("#radio"+num+"-"+numero).is(":checked")) {
                    rep.push({"numero":numero,"reponse":reponses[j]});
                }
            }

            reps.push({"num":numElmt,"type":type,"label":form.controls[i].control[0].label,"reponse":rep});
        }
        if(type==6){
            var tabCkBox =Session.get("ckboxgroup");

            tabCkBox.push({"element": num,"nbReponses":reponses.length});
            var rep=[];
            for(var j=0; j<reponses.length;j++){
                var numero=j+1;

                if($("#checkboxname"+num+"-"+numero).is(":checked")) {
                    rep.push({"numero":numero,"reponse":reponses[j]});
                }
            }
            reps.push({"num":numElmt,"type":type,"label":form.controls[i].control[0].label,"reponse":rep});
            Session.set("ckboxgroup",tabCkBox);
        }
        if(type==7){
           reps.push({"num":numElmt,"label":form.controls[i].control[0].label,"reponse":"fichier.fichier"});
        }
   // console.log(reps);



    }

return reps;

}