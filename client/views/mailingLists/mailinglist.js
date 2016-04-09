/**
 * Initialisation des variables de session
 */
Template.mailingList.rendered = function() {
  Session.set("idMailingList", "");
  Session.set("nameMailingList", "");
  Session.set("emailsMailingList", []);
  var validatorOptions = {
    custom: {
      unique_email: function ($el) {
        var email = $el.val();
        return !doublonEmail(email);
      },
        unique_name: function ($el) {
            var name = $el.val();
            return !doublonName(name);
        }
    },
    errors: {
        unique_email: "L'adresse mail existe déjà!",
        unique_name: "Le nom existe déjà!"
    }
  };
  $('#formNameMailing').validator(validatorOptions);
  $('#formEmailMailing').validator(validatorOptions);
};

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
 * Events
 */
Template.mailingList.events({
  "submit #formNameMailing":function(event){
    if (!event.isDefaultPrevented()) {
      event.preventDefault();

      var nom = $("#inputNomML").val();
      Session.set('nameMailingList', nom);
      $("#inputNomML").val("");
    }
  },

  "submit #formEmailMailing":function(event){
    if (!event.isDefaultPrevented()) {
      event.preventDefault();

      var email = ($("#inputTextMail").val());
      var emails = Session.get('emailsMailingList');
      emails.push(email);
      Session.set('emailsMailingList', emails);

      $("#inputTextMail").val('').focus();
    }
  },

  "click .deleteMail": function(event) {
    var email = $(event.target).attr('id');
    var emails = Session.get("emailsMailingList");
    emails = _.without(emails, _.findWhere(emails, email));
    Session.set('emailsMailingList', emails);
  },

  "click .saveMailing": function() {
    var error = false;
    var emails = $('.modifyMail').map(
        function(){
          var email = $(this).val();
          if (validationMail(email)) {
            return email;
          }else {
            error = true;
          }
        }).get();
    if(!error) {
      Session.set('emailsMailingList', emails);
      var emailsBd = MailingList.findOne({_id : Session.get('idMailingList')});
      if(!emailsBd) {
        MailingList.insert({"name": Session.get('nameMailingList'), "emails": Session.get('emailsMailingList')});
        swal("Création","Mailing list créé", "success");
      }else {
        MailingList.update(Session.get('idMailingList'), {$set: { name: Session.get('nameMailingList'), emails: Session.get('emailsMailingList') }});
        swal("Modification","Mailing list modifié", "success");
      }
      resetApercu();
    }else {
      swal("Erreur!","Un des emails est invalide!", "error");
    }

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
          resetApercu();
          MailingList.remove(id);
          swal("Suppression!", "La mailing list à été supprimé.", "success");
        });

  },

  "change #selectListe":function(){
    var id = $('#selectListe').val();
    if(id) {
      var mailsBd = MailingList.findOne({_id : id});
      Session.set("idMailingList", id);
      Session.set("nameMailingList", mailsBd.name);
      Session.set("emailsMailingList", mailsBd.emails);
    }
  }

});

/**
 * Fonctions
 */
validationMail = function (email) {
  return SimpleSchema.RegEx.Email.test(email);
};

doublonEmail = function (email) {
  var emailExist = (_.findWhere(Session.get('emailsMailingList'), email));
  return !!emailExist;
};

doublonName = function (name) {
    var nameExist = (_.findWhere(MailingList.find().fetch(), {name: name}));
    return !!nameExist;
}

resetApercu = function(){
  $('#selectListe').prop('selectedIndex',0);
  Session.set("idMailingList", "");
  Session.set("nameMailingList", "");
  Session.set("emailsMailingList", []);
};




