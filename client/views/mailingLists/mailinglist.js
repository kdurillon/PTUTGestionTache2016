/**
 * Initialisation des variables de session
 */
Meteor.startup(function(){
    Session.set("idMailingList", "");
    Session.set("nameMailingList", "");
    Session.set("emailsMailingList", []);
});

/**
 * Helper
 */
Template.mailingList.helpers({
  'mailingList': function(){
    return MailingList.find().fetch();
  },
  'Mails': function() {
    var emailsBd = MailingList.findOne({_id : Session.get('idMailingList')});
    var _id = emailsBd ? emailsBd._id : Session.get('idMailingList');
    var name = Session.get('nameMailingList');
    var emails = _.uniq(Session.get('emailsMailingList'));

    return {
      _id: _id,
      name: name,
      emails: emails
    }
  }

});

/**
 * Event
 */
Template.mailingList.events({
  "click #btValiderNomML":function(){
    var nom = $("#inputNomML").val();
    if(nom){
      Session.set('nameMailingList', nom);
      $("#inputNomML").val("");
    }
  },

  "click #btAjouterMailML":function(){
    var email = ($("#inputTextMail").val());

    if(validationMail(email) && !doublonEmail(email)) {

      $("#mailError").empty();

      var emailsBd = MailingList.findOne({_id : Session.get('idMailingList')});
      var emails = Session.get('emailsMailingList');
      if(emailsBd){
        emails = emails.concat(emailsBd.emails);
      }
      emails.push(email);
      Session.set('emailsMailingList', emails);
      $("#inputTextMail").val('');
    }
    else {
      if(doublonEmail(email)){
        $("#mailError").html("l'adresse Email existe déjà");
      }
      else{
        $("#mailError").html("Adresse Email erronée");
      }
    }

    $("#inputTextMail").focus();
  },

  "click .deleteMail": function(event) {
    var email = $(event.target).attr('id');
    var emails = Session.get("emailsMailingList");
    emails = _.without(emails, _.findWhere(emails, email));
    Session.set('emailsMailingList', emails);
  },

  "click .saveMailing": function() {
    var emailsBd = MailingList.findOne({_id : Session.get('idMailingList')});
    if(!emailsBd) {
      MailingList.insert({"name": Session.get('nameMailingList'), "emails": Session.get('emailsMailingList')});
      swal("Création","Mailing list créé", "success");
    }else {
      MailingList.update(Session.get('idMailingList'), {$set: { name: Session.get('nameMailingList'), emails: Session.get('emailsMailingList') }});
      swal("Création","Mailing list modifié", "success");
    }
    resetApercu();
  },

  "click .deleteMailing":function(event) {
    var id = $(event.target).attr('id');
    swal({
          title: "Suppression mailing list?",
          text: "Voulez-vous supprimer la mailing List ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          closeOnConfirm: false
        },
        function(){
          MailingList.remove(id);
          $("#selectListe").val("Ajouter une liste de mails");
          $(".buttonMod").hide();
          swal("Suppression!", "La mailing list à été supprimé.", "success");
        });
    resetApercu();
  },

  "change #selectListe":function(){
    resetApercu();
    var id= $('#selectListe').val();
    if(id) {
      var mailsBd = MailingList.findOne({_id : id});
      Session.set("idMailingList", id);
      Session.set("nameMailingList", mailsBd.name);
      Session.set("emailsMailingList", mailsBd.emails);
    }

  }

});

  /******************************************************************* Fonctions************/

  validationMail = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  doublonEmail = function (email) {
    var emails = (_.findWhere(Session.get('emailsMailingList'), email));
    return !!emails;
  };

  resetApercu = function(){
    Session.set("idMailingList", "");
    Session.set("nameMailingList", "");
    Session.set("emailsMailingList", []);
  };




