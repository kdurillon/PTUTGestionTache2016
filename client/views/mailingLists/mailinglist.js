
  /******************************************************************* Variables*/

  Meteor.startup(function(){
    Session.set("countMail",0);
    Session.set("validListTitre",0);
    Session.set("validListMail",0);
    Session.set("listMail",[]);
    Session.set("listListe",[]);
  });

  /******************************************************************* Evénements des boutons */

Template.mailingList.events({
  "click #btValiderNomML":function(event, template){
    if($("#inputNomML").val()){
      var tmp =increment("validListTitre");
      verificationEnr();
      template.$("#NomapercuML").html($("#inputNomML").val());
    }


  },
  "click #btAjouterMailML":function(event, template){
    if(template.$("#inputTextMail").val()!="" && validationMail($("#inputTextMail").val()) && !doublonEmail($("#inputTextMail").val())) {


      $("#mailError").html("");
      var tmp =increment("validListMail");
      verificationEnr();

      var tab = Session.get("listMail");
      tab.push($("#inputTextMail").val());
      Session.set("listMail",tab);
      console.log(tab);

      var tmp =increment("countMail");
      var mod="<span id='pencil"+tmp+"' class='pencil cursor glyphicon glyphicon-pencil'></span><span id='mod"+tmp+"' class='mod'>Modifier ? <span id='modoui"+tmp+"' class='modoui cursor glyphicon glyphicon-ok'></span><span class='remove cursor glyphicon glyphicon-remove'></span></span>";
      var htmlsup = mod+"<span id='trash"+tmp+"' class='trash cursor glyphicon glyphicon-trash'></span><span id='val"+tmp+"' class='val'>Supprimer ? <span id='sup"+tmp+"' class='supok cursor glyphicon glyphicon-ok'></span><span class='remove cursor glyphicon glyphicon-remove'></span></span></td>";
      var input="<div id='modMail"+tmp+"'  class='modMail'><input id='modInputMail"+tmp+"'  class='modInput inputTextMailingLists' type='text' value=''></div>";
      template.$("tr:first-child").after("<tr class='mailMailinglist' id='trMail"+tmp+"'><td >"+ input +"<div id='mailAper"+tmp+"' class='mailAper'>"+ $("#inputTextMail").val()  +"</div><td>"+htmlsup+"</td></tr>");
      template.$("#inputTextMail").val("");
    }
    else {
      if(doublonEmail($("#inputTextMail").val())){
        $("#mailError").html("l'adresse Email existe déjà");
      }
      else{
        $("#mailError").html("Adresse Email érronée");
      }


    }



    $("#inputTextMail").focus();
  },
  "click .trash":function(event, template) {

    var id=$(event.target).attr('id');
    var id2=id.substring(5);
    $(event.target).hide();
    $("#pencil"+id2).hide();
    $("#val"+id2).show();

  },
  "click .supok":function(event, template) {
    var id=$(event.target).attr('id');
    var id2=id.substring(3);
    $("#trMail"+id2).remove();

    id2--;
    tab.splice(id2,1);
    Session.set("listMail",tab);
    $(".remove").trigger("click");

  },

    "click .pencil":function(event, template) {
    var id=$(event.target).attr('id');
    var id2=id.substring(6);
    $(event.target).hide();
    $("#trash"+id2).hide();
    $("#mod"+id2).show();
    $("#mailAper"+id2).hide();
    $("#modMail"+id2+" input").val($("#mailAper"+id2).html());
    $("#modMail"+id2).show();
    $("#modInputMail"+id2).focus();

  },

  "click .modoui":function(event, template) {
    var id=$(event.target).attr('id');
    var id2=id.substring(6);
    $("#mailAper"+id2).html( $("#modMail"+id2+" input").val());
    $(".remove").trigger("click");
  },

  "click #buttonEnrMailingList":function(event, template) {
    var tab = Session.get("listMail");
    console.log(tab);
    var emails = tab.join(";");
    console.log(emails);
    Mails.insert({"name":$("#NomapercuML").html(),"emails":""+emails});

    console.log(Mails.find().fetch());


  },
  "click .remove":function(event, template) {
    $(".modInput").hide();
    $(".val").hide();
    $(".mod").hide();
    $(".trash").show();
    $(".pencil").show();
    $(".mailAper").show();
    $(".modMail").hide();

  },
  "change #selectListe":function(event, template){

    var id=$(event.target).attr('id');
    if($("#"+id).val()=="Ajouter une liste de mails"){
      template.$("#NomapercuML").html("");
      $(".mailMailinglist").remove();
    }
    else{
      var liste = Mails.findOne( { name : $("#"+id).val() });
      template.$("#NomapercuML").html(liste.name);
      liste=liste.emails;
      var tabliste= liste.split(";");
      console.log("tabliste to string : "+tabliste);



      for (tmp=0;tmp<tabliste.length;tmp++){
        /*
         var mod="<span id='pencil"+tmp+"' class='pencil cursor glyphicon glyphicon-pencil'></span><span id='mod"+tmp+"' class='mod'>Modifier ? <span id='modoui"+tmp+"' class='modoui cursor glyphicon glyphicon-ok'></span><span class='remove cursor glyphicon glyphicon-remove'></span></span>";
         var htmlsup = mod+"<span id='trash"+tmp+"' class='trash cursor glyphicon glyphicon-trash'></span><span id='val"+tmp+"' class='val'>Supprimer ? <span id='sup"+tmp+"' class='supok cursor glyphicon glyphicon-ok'></span><span class='remove cursor glyphicon glyphicon-remove'></span></span></td>";
         var input="<div id='modMail"+tmp+"'  class='modMail'><input id='modInputMail"+tmp+"'  class='modInput inputTextMailingLists' type='text' value=''></div>";
         template.$("tr:first-child").after("<tr class='mailMailinglist ' id=' trMail"+tmp+"'><td >"+ input +"<div id='mailAper"+tmp+"' class='mailAper'>"+ tabliste[tmp-1]  +"</div><td>"+htmlsup+"</td></tr>");
         */
        console.log(tabliste[tmp]);
      }
    }

  }

});

  /******************************************************************* Variables pour le template ************/



Template.mailingList.helpers({

  'Mails': function(){

  var tmp = Mails.find().fetch();
    return tmp;
  }
}
);



  /******************************************************************* Fonctions************/

  increment=function(nom){

    var tmp = Session.get(nom);
    tmp++;
    Session.set(nom,tmp);
    return tmp;

  }

  verificationEnr=function(tab) {

    if (Session.get("validListMail") > 0 && Session.get("validListTitre") > 0) {
      $("#buttonEnrMailingList").show();
    }
  }

    validationMail = function (email) {

      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return re.test(email);
    }

  doublonEmail = function (email) {

      var tabtmp = Session.get("listMail");
      console.log(tabtmp);
      console.log(email);
      for (a = 0; a < tabtmp.length; a++) {
        if (tabtmp[a] === email) {
          return true;
        }
      }
      return false;
    }







