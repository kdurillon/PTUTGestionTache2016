
  /******************************************************************* Variables*/

  Meteor.startup(function(){
    Session.set("countMail",-1);
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

    var email=($("#inputTextMail").val());

    if(template.$("#inputTextMail").val()!="" && validationMail($("#inputTextMail").val()) && !doublonEmail($("#inputTextMail").val())) {

      $("#mailError").html("");
      var tmp =increment("validListMail");
      verificationEnr();

      var tab = Session.get("listMail");
      tab.push($("#inputTextMail").val());
      Session.set("listMail",tab);
      console.log(tab);

      var tmp =increment("countMail");
      genererApercu(tmp,email);
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
    var tab =Session.get("listMail");
    tab.splice(id2,1);
    Session.set("listMail",tab);
    $(".remove").trigger("click");
    console.log(tab);
  },
    "click .pencil":function(event, template) {
    var id=$(event.target).attr('id');
    var id2=id.substring(6);
    $(event.target).hide();
    $("#trash"+id2).hide();
    $("#mod"+id2).show();
    $("#mailAper"+id2).hide();
    $("#modInputMail"+id2).show().val($("#mailAper"+id2).html());
    $("#modMail"+id2).show();
    $("#modInputMail"+id2).focus();

  },

  "click .modoui":function(event, template) {
    var id=$(event.target).attr('id');
    var id2=id.substring(6);
    if(validationMail($("#modMail"+id2+" input").val())){
      var tab =Session.get("listMail");
      tab[id2]=$("#modMail"+id2+" input").val();
      Session.set("listMail",tab);
      $("#mailAper"+id2).html( $("#modMail"+id2+" input").val());
      $(".remove").trigger("click");
      $("#mailError2").remove();
    }
    else{
      $("#modMail"+id2+" input").after("<div id='mailError2' class='mailError'>Adresse Email érronée</div>");
    }

  },

  "click #buttonEnrMailingList":function(event, template) {
    var tab = Session.get("listMail");
    var emails = tab.join(";");
    Mails.insert({"name":$("#NomapercuML").html(),"emails":""+emails});
    viderApercu();
  },
  "click #buttonModMailingList":function(event, template) {
    id=$("#selectListe").val();
    Mails.remove(id);
    var tab = Session.get("listMail");
    var emails = tab.join(";");
    Mails.insert({"name":$("#NomapercuML").html(),"emails":""+emails});
    viderApercu();
  },
  "click #buttonSupMailingList":function(event, template) {
    var id=$(event.target).attr('id');
    $("#"+id).hide();
    $("#supList").show();
      },
  "click #supListok":function(event, template) {
    viderApercu();
    id=$("#selectListe").val();
    Mails.remove(id);
    $("#selectListe").val("Ajouter une liste de mails");
    $(".buttonMod").hide();

  },
  "click .remove":function(event, template) {
    $(".modInput").hide();
    $(".val").hide();
    $(".mod").hide();
    $(".trash").show();
    $(".pencil").show();
    $(".mailAper").show();
    $(".modMail").hide();
    $("#mailError2").html("");

  },
  "click .remove2":function(event, template) {
    $(".buttonMod").show();
    $("#supList").hide();
  },

  "change #selectListe":function(event, template){
    resetApercu();
    var id=$(event.target).attr('id');
    Session.set("listMail",[]);
    if($("#"+id).val()=="Ajouter une liste de mails"){
    viderApercu();
    }
    else{
      viderApercu();
      $(".buttonMod").show();
      var liste = Mails.findOne( { _id : $("#"+id).val() });
      template.$("#NomapercuML").html(liste.name);
      liste=liste.emails;
      var tabliste= liste.split(";");

      var tab =[];
      for (tmp=0;tmp<tabliste.length;tmp++){

        tab.push(tabliste[tmp]);
        genererApercu(tmp,tabliste[tmp]);
        console.log(tab);

      }
      Session.set("listMail",tab);
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

  viderApercu = function () {
    $("#NomapercuML").html("");
    $(".mailMailinglist").remove();
    $("#buttonEnrMailingList").hide();
    $(".buttonMod").hide();
    $(".supList").hide();
  }

  genererApercu = function(num,email){

    var mod="<span id='pencil"+num+"' class='pencil cursor glyphicon glyphicon-pencil'></span><span id='mod"+num+"' class='mod'>Modifier ? <span id='modoui"+num+"' class='modoui cursor glyphicon glyphicon-ok'></span><span class='remove cursor glyphicon glyphicon-remove'></span></span>";
    var htmlsup = mod+"<span id='trash"+num+"' class='trash cursor glyphicon glyphicon-trash'></span><span id='val"+num+"' class='val'>Supprimer ? <span id='sup"+num+"' class='supok cursor glyphicon glyphicon-ok'></span><span class='remove cursor glyphicon glyphicon-remove'></span></span></td>";
    var input="<div id='modMail"+num+"'  class='modMail'><input id='modInputMail"+num+"'  class='modInput form-control' type='text' value=''></div>";
    $("tr:first-child").after("<tr class='mailMailinglist ' id='trMail"+num+"'><td >"+ input +"<div id='mailAper"+num+"' class='mailAper'>"+ email  +"</div><td>"+htmlsup+"</td></tr>");

  }
  resetApercu = function(){
    Session.set("validListTitre",0);
    Session.set("validListMail",0);
    Session.set("countMail",-1);

  }




