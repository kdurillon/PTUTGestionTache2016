var renduLoad = false;

Template.formulaireGenere.rendered = function() {

    Session.set("nbElementForm",0);
    Session.set("ckboxgroup",[]);
    Session.set("NumeroReps",0);
    Session.set("tabUpload",[]);

    var params = Router.current().params;
    Session.set("idForm",params["_id"]);
    Session.set("idEmail",params["mailEncode"]);

   $(".navbar").hide();

    renduLoad = false
};



Template.formulaireGenere.helpers({
        'Form': function(){

        //on récupère les paramètres de la requête

        var params = Router.current().params;

         //On decode l'email de l'envoi
        var decodedEmail = base64(params["mailEncode"],"decode");

       // On vérifie que l'email encodé existe dans une mailinglist
        var checkmail=false;
        var mailingslists = mailingList.find().fetch();
        mailingslists.forEach(function(mailinglist){
            mailinglist.emails.forEach(function(email){
                if(email === decodedEmail){
                    checkmail=true;
                }
            });
        });
        var idEmail = base64(params["mailEncode"],"decode");
        if(checkmail){
            var reponse = reponsesForm.find({idForm:""+params["_id"],idUser:idEmail}).fetch();
            if(_.isEmpty(reponse)){
                $(".formBoutons").show();
                 return tempFormulaire.find({_id:""+params["_id"]});
             }
            else{
                 formulaireEnvoye();
             }
        }
        else{
           personneInconnue();
        }


    },
    'isInputText': function(display){
        return display == "1";

    },
    'isTextArea': function(display){
        return display == "2";

    },
    'isInputDate': function(display){
        return display == "3";

    },
    'isInputChoixBinaire': function(display){
        return display == "4";

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
        return display == "7";

    }
});

Template.formulaireGenere.events({

    'mousemove #corpsForm': function() {
        if(!renduLoad) {
            tinymce.init({
                selector: '.textarea',
                skin_url: '/packages/teamon_tinymce/skins/lightgray',
                language: 'fr_FR'
            });
            $('.datetimepicker').datetimepicker({
                format: 'L - LT',
                locale: 'fr'
            });
            renduLoad = true;
        }
    },

    'click .upload_button': function (event) {

      var num= $(event.target).attr("id");
      num=num.substring(9,num.length);

      var repondu = uploads.find({"userId":Session.get("idForm"),"numElement":num,"EmailId": Session.get("idEmail")}).fetch();
        if(!_.isEmpty(repondu)){
             swal("Interdit","Vous avez déjà envoyé un fichier","error");
        }
        else{
            Modal.show('uploadModalExt');
        }

    },

    'submit form': function (event) {

        event.preventDefault();

        var params = Router.current().params;
        var idUser=params["mailEncode"];
        var idForm=params["_id"];

        var reps=tableauReponses(idForm,idUser);
        var tabCkBox =Session.get("ckboxgroup");
        var verif = false;
        var verif2 = [];


        for(var a=0;a<tabCkBox.length;a++){
            verif = false;
            for(var b=1;b<=tabCkBox[a]["nbReponses"];b++){
                if($("#checkboxname"+tabCkBox[a]["element"]+"-"+b).is(":checked")){
                verif=true;
                verif2.push("true");
                $(".errorCkBox"+tabCkBox[a]["element"]).hide();
                }
            if(!verif){
                $(".errorCkBox"+tabCkBox[a]["element"]).show();
            }
            }


        }


        if(verif2.length>=tabCkBox.length){

            if(verificationEnvoiFichiers()) {
                idUser = base64(idUser, "decode");
                reponsesForm.insert({"idForm": idForm, "idUser": idUser, "reponses": reps});
                swal("Réussite", "Formulaire envoyé !", "success");
                formulaireEnvoye();
            }
        }
        else{
            Session.set("ckboxgroup",[]);
        }

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


}

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
            var tabUpload=Session.get("tabUpload");
            tabUpload.push(num);
            Session.set("tabUpload",tabUpload);
           reps.push({"num":numElmt,"type":type,"label":form.controls[i].control[0].label,"reponse":"fichier joint"});
        }

    }

return reps;

}

formulaireEnvoye = function(){
    $(".formBoutons").hide();
    $("#corpsForm").hide();
    $("#retour").show();
}

personneInconnue = function(){
    $(".formBoutons").hide();
    $("#corpsForm").hide();
    $("#inconnu").show();
}

afficherForm = function(){
    $(".formBoutons").show();
}