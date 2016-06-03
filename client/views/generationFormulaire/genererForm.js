Template.formulaireGenere.rendered = function(data) {

    tinymce.init({
        selector: 'textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        language: 'fr_FR'
    });

    Session.set("nbElement",0);
    Session.set("reps",0);

    $(".navbar").hide();
};



Template.formulaireGenere.helpers({
    'Form': function(){

        var idFormulaire =Router.current().params;

        console.log(idFormulaire);

        return tempFormulaire.find({_id:""+idFormulaire["_id"]}).fetch();
    },
    'isInputText': function(display){
        if(display=="1"){
            ajouterElement();
            return true;
        }
        return false;
    },
    'isTextArea': function(display){
        if(display=="2"){
             ajouterElement();
            return true;
        }
        return false;
    },
    'isInputDate': function(display){
        if(display=="3"){
             ajouterElement();
            return true;
        }
        return false;
    },
    'isInputChoixBinaire': function(display){
        if(display=="4"){
             ajouterElement();
            return true;
        }
        return false;
    },
    'isInputRadios': function(display){
        if(display=="5"){
            Session.set("reps",0);
             ajouterElement();
            return true;
        }
        return false;
    },
    'isInputCheckboxs': function(display){
        if(display=="6"){
            Session.set("reps",0);
             ajouterElement();
            return true;
        }
        return false;
    },
    'isInputUpload': function(display){
        if(display=="7"){
             ajouterElement();
            return true;
        }
        return false;
    },
    "numero":function(){
        return Session.get("nbElement");
    },
    "rep":function(){
    var rep =Session.get("reps");
    rep++;
    Session.set("reps",rep);
    return rep;
}
});

Template.formulaireGenere.events({

    'click .upload_button': function () {
        Modal.show('uploadModal');
    },
    'submit form': function (event) {

        event.preventDefault();

        var idFormulaire =Router.current().params;
        var idUser=idFormulaire["idUtilisateur"];
        var idForm=idFormulaire["_id"];

        swal("Réussite","Formulaire envoyé !","success");

        var reps=tableauReponses(idForm,idUser);

           $("#corpsForm").hide();
           $("#retour").show();

        reponsesForm.insert({"idForm":idForm,"idUser":idUser,"reponses":reps});


    }
    
});


//************************************************************ fonctions

ajouterElement = function(){
    var plus=Session.get("nbElement");
    plus++;
    Session.set("nbElement",plus);
}

tableauReponses= function(idForm,idUser){


    var form =tempFormulaire.findOne(idForm);

    var reps=[];
    console.log(form.controls.length);
    for (var i=0 ; i < form.controls.length ; i++){

        var type =form.controls[i].control[0].typeControl;
        var reponses =form.controls[i].control[0].reponses;
        var  num=i+1;
        console.log("ok");
        if(type==1){
            reps.push({"type":type,"label":form.controls[i].control[0].label,"reponse":$("#inputText"+num).val()});
        }
        if(type==2){
            reps.push({"type":type,"label":form.controls[i].control[0].label,"reponse":$("#textArea"+num).val()});
        }
        if(type==3){
            reps.push({"type":type,"label":form.controls[i].control[0].label,"reponse":$("#date"+num).val()});
        }
        if(type==4){
            if($("#radio"+num).is(":checked")){
                reps.push({"type":type,"label":form.controls[i].control[0].label,"reponse":"oui"});
            }
            else{
                reps.push({"type":type,"label":form.controls[i].control[0].label,"reponse":"non"});
            }
         }
        if(type==5){
            var rep="";
            for(var j=0; j<reponses.length;j++){
                var numero=j+1;
                if($("#radio"+num+"-"+numero).is(":checked")) {
                    rep=reponses[j];
                }
            }
            reps.push({"type":type,"label":form.controls[i].control[0].label,"reponse":rep});
        }
        if(type==6){
            var rep=[];
            for(var j=0; j<reponses.length;j++){
                var numero=j+1;
                if($("#checkboxname"+num+"-"+numero).is(":checked")) {
                    rep.push({"numero":numero,"reponse":reponses[j]});
                }
            }
            reps.push({"type":type,"label":form.controls[i].control[0].label,"reponse":rep});
        }
        if(type==7){
           reps.push({"label":form.controls[i].control[0].label,"reponse":"fichier.fichier"});
        }
    console.log(reps);



    }

return reps;

}