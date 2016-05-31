Template.register.rendered = function() {
    $('#formRegister').validator();
};


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

            case "5":{
                $("#repFormGen").show();
                break;
            }
            case "6":{
               $("#repFormGen").show();
                break;
            }
            default:{
                $("#repFormGen").hide();
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
            break;}
        //une date et une heure
        case "4":{


            break;
        }
            //une date et une heure
        case "5":{


                break;
            }
            //une date et une heure
        case "6":{


                break;
            }
            //une date et une heure
        case "7":{


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