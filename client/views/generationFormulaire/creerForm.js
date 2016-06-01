Template.formulaireCree.rendered = function() {
    Session.set("plus","0");
    Session.set("reponses",[]);
    Session.set("controls",[]);
    Session.set("labels",[]);
    Session.set("typeControls",[]);
    $('#formRegister').validator();
    $('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY - LT',
        locale: 'fr',
        minDate: moment().add(10, 'm')
    });
    tinymce.init({
        selector: 'textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        language: 'fr_FR'
    });
    
   

};


Template.formulaireCree.events({

    "click #ajouterElmtFormGen" :function(){

        if($("#inputTextGenForm").val()!="") {

            var html = apercuDiv($("#inputTextGenForm").val(), $("#inputSelectGenForm").val());

            console.log(html);


            var plus = Session.get("plus");


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
        }
        resetFormGenere();
    },
    "click #ajouterTitreFormGen" :function() {
    $("#apercuForm").html($("#inputTitreGenForm").val());
    },

    "click #ajouterRepFormGen" :function() {

        var rep= $("#inputLabelRepGenForm").val();

        if(rep!=""){

            var reponses=Session.get("reponses");
            reponses.push(rep);
            Session.set("reponses",reponses);

            console.log(reponses);

            $(" .rep"+reponses.length).after("<div class='repTemp rep"+(reponses.length+1)+"'>"+rep+"</div>");

            $("#inputLabelRepGenForm").val("");

        }

    },
    "click #effacerApercu" :function() {
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
                var idForm= tempFormulaire.insert({"titre": $("#inputTitreGenForm").val(), "controls": controls});
                alert(idForm);
                console.log(controls);
                $("#inputTitreGenForm").val("");
                $("#apercuForm").html("Titre du formulaire");
                swal("Formulaire généré !", "success");
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

    controls.push({"control":[{"label":label,"typeControl":elmt,"reponses":reps}]});

    console.log(controls);
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
       ctrl="<textarea rows='10'  class='form-control'  type='text'  placeholder='Entrez votre texte ici.'></textarea>";
       break;
        }
        //une date et une heure
        case "3":
        {
            ctrl="<input  class='form-control'  type='date'    />";
           /* ctrl = "<div class='input-group datetimepicker'>"+
                   "<span class='input-group-addon'><i class='glyphicon glyphicon-calendar'></i></span></div>";*/

            break;
        }
        //un choix oui / non
        case "4":{

            ctrl = "<div><label for='' class='radioGen radio-inline'><input name='radio"+plus+"' type='radio' class=' '  >Oui</label>"+
                    "<label for='' class='radioGen radio-inline'><input name='radio"+plus+"' type='radio' class=' '  >Non</label></div>";
            break;
        }
            //un choix à réponse unique
        case "5":{


            var ctrl="<br>";
            for(i=0;i<reps.length;i++){
                ctrl += "<div class='radio'><label for=''><input name='radio"+plus+"' type='radio' class=' '  >"+reps[i]+"</label></div>";
            }
            break;
            }
            //un choix à réponse unique
        case "6":{
            var ctrl="";
            for(i=0;i<reps.length;i++){
                ctrl += "<div class='checkbox'><label for=''><input name='checkbox' type='checkbox' class=' ' >"+reps[i]+"</label></div>";
            }

                break;
            }
            //une date et une heure
        case "7":{

            ctrl="<div><button class='btn btn-info'><span class='glyphicon glyphicon-upload'></span> Envoyer un fichier </button></div>";
            break;
            }
    }

    var html="<div class='ctrlsApercu text-center form-group formApercu"+plus+" '><label for='' class='labelApercu control-label'>"+label+"</label>"+ctrl+"</div>";
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