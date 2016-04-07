/**
 * Created by lp on 06/04/2016.
 */

//************************************************************ chargement
/*Template.formulaireGe

$('.datepicker').datepicker();
*/
//************************************************************ événements


Template.formulaireGenere.events({

    "click #ajouterElmtFormGen" :function(){

        var plus=$("#inputPlaceGenForm").val();
        var html=div($("#inputTextGenForm").val(),$("#inputSelectGenForm").val(),plus);
        if($("#inputTextGenForm").val()!="" && $("#inputPlaceGenForm").val()!="" ){$("#apercuForm").after(html);resetFormGenere();$('.datepicker').datepicker(); }

    },
    "click #ajouterTitreFormGen" :function() {
    $("#apercuForm").html($("#inputTitreGenForm").val());
    },
    "change #inputSelectGenForm" : function(){
        switch($("#inputSelectGenForm").val()){

            case "1":{
                $("#elemtPlusformGen").html(" <label for='inputPlaceGenForm' class='control-label'>Entrez l\'indication de saisie de votre élément :</label>"+
               " <input id='inputPlaceGenForm' class='form-control' type='text'  placeholder='Votre question, le document demandé, le type de rendez-vous...'/>");
                break;
            }
            case "2":{
                $("#elemtPlusformGen").html("");
                break;
            }

        }

    }
});

//************************************************************ fonctions

div =function(label,elmt,plus){

    var ctrl="";

    switch(elmt){

        //une réponse
        case "1":{
        ctrl="<input  class='form-control'  type='text'   placeholder='"+plus+"' />";
            break;
        }
        //un message
        case "2":{
        ctrl="<textarea  class='form-control'  type='text'  placeholder='"+plus+"'><textarea/>";
            break;
        }
        //une date et une heure
        case "3":{
            ctrl="<input type='text' class='form-control datepicker' placeholder='"+plus+"' >";
            break;
        }
        case "4":{


            break;
        }
    }
    var html="<div class='form-group '><label for='' class='control-label'>"+label+"</label>"+ctrl+"</div>";

    return html;
}

resetFormGenere = function(){
    $("#inputTextGenForm").val("");
    $("#inputSelectGenForm").val("1");
}