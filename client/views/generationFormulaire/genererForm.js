

Template.formulaireGenere.rendered = function(data) {

    tinymce.init({
        selector: 'textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        language: 'fr_FR'
    });

    Session.set("nbElementForm",0);
    Session.set("ckboxgroup",[]);
    Session.set("NumeroReps",0);

   $(".navbar").hide();


};



Template.formulaireGenere.helpers({
   
    'Form': function(){

        //on récupère les paramètres de la requête
        var params =Router.current().params;



        // Objet de conversion base 64
        var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

        var encodedEmail = Base64.encode("toot@gmail.com");
        console.log(encodedEmail);


         //On decode l'email de l'envoi
        var decodedEmail = Base64.decode(params["idUtilisateur"]);

       // On vérifie que l'email encodé existe dans une mailinglist
        var checkmail=false;
        var mailingslists = mailingList.find().fetch();
        mailingslists.forEach(function(mailinglist){
            mailinglist.emails.forEach(function(email){
                if(email===decodedEmail){
                    checkmail=true;
                }
            });
        });

        if(checkmail){
            var reponse = reponsesForm.find({idForm:""+params["_id"],idUser:""+params["idUtilisateur"]}).fetch();
            if(reponse.length==0){
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

        //Si le formulaire a déjà été rempli, on masque le formulaire
        var reponse = reponsesForm.find({idForm:""+params["_id"],idUser:""+params["idUtilisateur"]}).fetch();
        console.log(reponse);
      /*  if(reponse!=[]){
            formulaireEnvoye();
        }*/


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

    'click .upload_button': function (event) {
        event.preventDefault();
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
        var verif2 = [];

        console.log(tabCkBox);

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

           // console.log("envoi ok");
             reponsesForm.insert({"idForm":idForm,"idUser":idUser,"reponses":reps});
             swal("Réussite","Formulaire envoyé !","success");
            formulaireEnvoye();

        }
        else{
            Session.set("ckboxgroup",[]);


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

formulaireEnvoye = function(){
    $(".formBoutons").hide();
    $("#corpsForm").hide();
    $("#retour").show();
}

personneInconnue=function(){
    $(".formBoutons").hide();
    $("#corpsForm").hide();
    $("#inconnu").show();
}

afficherForm =function(){
    $(".formBoutons").show();
}