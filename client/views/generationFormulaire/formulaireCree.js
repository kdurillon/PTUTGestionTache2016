Template.formulaireCree.rendered = function() {
    Session.set("plus",0);
    Session.set("reponses",[]);
    Session.set("controls",[]);
    Session.set("labels",[]);
    Session.set("typeControls",[]);
    Session.set("numReponse",0);
    $('#formRegister').validator();
    $('.datetimepicker').datetimepicker({
        format: 'L - LT',
        locale: 'fr',
        minDate: moment().add(1, 'd')
    });

    
   

};


Template.formulaireCree.events({

    "click #ajouterElmtFormGen" :function(){

        if($("#inputTextGenForm").val()==""){
            swal("Label de l'élément","Vous devez saisir un libellé pour votre élément.","error");
        }
       if($("#inputTextGenForm").val()!="") {


           var reponses=Session.get("reponses");
           //alert($(".repFormGen").css("display"));
           if(($(".repFormGen").css("display")!="none") &&  reponses.length==0 ){
               swal("Réponses possibles pour l'élément","Vous devez créer des réponses pour votre élément.","error");
           }
           else {

               var html = apercuDiv($("#inputTextGenForm").val(), $("#inputSelectGenForm").val());

               var plus = Session.get("plus");
               Session.set("numReponse", 0);

               if (plus == 1) {

                   if ($("#inputTextGenForm").val() != "" && $("#inputPlaceGenForm").val() != "") {
                       $(".formApercu0").after(html);

                   }
               }
               else {
                   plus--;
                   if ($("#inputTextGenForm").val() != "" && $("#inputPlaceGenForm").val() != "") {
                       $(".formApercu" + plus).after(html);
                   }
               }

               $('.datetimepicker').datetimepicker({
                   format: 'L - LT',
                   locale: 'fr'
               });
               resetFormGenere();
           }
        }




    },
    "click #ajouterTitreFormGen" :function() {
    $("#apercuForm").html($("#inputTitreGenForm").val());
    },

    "click #ajouterRepFormGen" :function() {

        var rep= $("#inputLabelRepGenForm").val();

        if(rep!=""){

           num=Session.get("numReponse");
            num++;
            Session.set("numReponse",num);

            var reponses=Session.get("reponses");
            reponses.push({"num":num,"libelle":rep});
            Session.set("reponses",reponses);

            $(" .rep"+reponses.length).after("<div class='repTemp rep"+(reponses.length+1)+"'>"+rep+"</div>");

            $("#inputLabelRepGenForm").val("");

        }

    },
    "click #effacerApercu" :function() {

        $("#inputSelectGenForm").val(1);
        $(".ctrlsApercu").remove();
        Session.set("plus","0");
        $("#inputLabelRepGenForm").val("");
        Session.set("reponses",[]);
        Session.set("controls",[]);
        $(".repTemp").remove();
        $(".repFormGen").hide();

    },



    "change #inputSelectGenForm" : function(){

        $("#inputLabelRepGenForm").val("");
        Session.set("reponses",[]);
        $(".repTemp").remove();
        switch($("#inputSelectGenForm").val()){

            case "5":{
                $(".repFormGen").show();
                break;
            }
            case "6":{
               $(".repFormGen").show();
                break;
            }
            default:{
                $(".repFormGen").hide();
            }
                

        }

    },

    'click #EnrForm': function() {

        var plus = Session.get("plus");
        var controls = Session.get("controls");

        if($("#inputTitreGenForm").val()==""){
            swal("Titre ?","Vous devez donner un titre à votre document !", "error");
        }

        else{

            if(plus==0){
                swal("Elément ?","Vous devez entrer au moins élément !", "error");
            }
            else{
                var idForm= tempFormulaire.insert({"titre": $("#inputTitreGenForm").val(), "controls": controls , "model":true,"activation":true});
                console.log(controls);
                $("#inputTitreGenForm").val("");
                $("#apercuForm").html("Titre du formulaire");
                swal("Succès","Formulaire généré !", "success");
                $("#effacerApercu").trigger("click");
            }
        }


    }

});

//************************************************************ fonctions

apercuDiv =function(label,elmt){

    var ctrl="";

    var plus =Session.get("plus");
    var controls =Session.get("controls");
    var reps=Session.get("reponses");
    var nbElement=plus+1;

    controls.push({"control":[{"numero":nbElement,"label":label,"typeControl":elmt,"reponses":reps}]});

    Session.set("controls",controls);
    plus++;

    switch(elmt){

        //une réponse
        case "1":{
        ctrl="<input  class='form-control'  type='text'   placeholder='Entrez votre texte ici.' />";
            break;
        }
        //un message
        case "2":{
       ctrl="<textarea rows='10'  class=' form-control'  type='text'  placeholder='Entrez votre texte ici.'></textarea>";
       break;
        }
        //une date et une heure
        case "3":
        {
            ctrl="<input  class='form-control datetimepicker'  type=text'    />";
           /* ctrl = "<div class='input-group datetimepicker'>"+
                   "<span class='input-group-addon'><i class='glyphicon glyphicon-calendar'></i></span></div>";*/

            break;
        }
        //un choix oui / non
        case "4":{

            ctrl = "<div ><div class='radio-inline'><label for='' class='radioGen '><input name='radio"+plus+"' type='radio' class=' '  >Oui</label></div>"+
                    "<div class='radio-inline'><label for='' class='radioGen '><input name='radio"+plus+"' type='radio' class=' '  >Non</label></div></div>";
            break;
        }
            //un choix à réponse unique
        case "5":{


            var ctrl="<br>";
            for(var i=0;i<reps.length;i++){
                ctrl += "<div class='radio-inline '><label for=''><input name='radio"+plus+"' type='radio' class=' '  >"+reps[i]["libelle"]+"</label></div>";
            }
            break;
            }
            //un choix à réponse multiple
        case "6":{
            var ctrl="<div>";
            for(var i=0;i<reps.length;i++){
                ctrl += "<div class='checkbox-inline '><label for=''><input name='checkbox' type='checkbox' class=' ' >"+reps[i]["libelle"]+"</label></div>";
            }
            ctrl+="</div>";
            break;
            }
            //une date et une heure
        case "7":{
            ctrl="<div><button type='button' class='btn btn-info'><span class='glyphicon glyphicon-upload'></span> Envoyer un fichier </button></div>";
            break;
            }
    }

    var html="<div class='ctrlsApercu col-md-12 text-center form-group formApercu"+plus+" '><label for='' class='labelApercu control-label'>"+label+"</label>"+ctrl+"</div>";
    Session.set("plus",plus);
    $("#inputLabelRepGenForm").val("");
    Session.set("reponses",[]);
    $(".repTemp").remove();
    $(".repFormGen").hide();
    return html;
};

resetFormGenere = function(){
    $("#inputTextGenForm").val("");
    $("#inputSelectGenForm").val("1");
};