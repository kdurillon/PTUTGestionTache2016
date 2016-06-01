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
            var nom = $el.val();
            return !doublonName(nom);
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
  'Mails': function() {
    var emailsBd = mailingList.findOne({_id : Session.get('idMailingList')});
    var _id = emailsBd ? emailsBd._id : Session.get('idMailingList');
    var nom = Session.get('nameMailingList');
    var emails = _.uniq(Session.get('emailsMailingList'));
    return {
      _id: _id,
      nom: nom,
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

      var nom = $("#inputNomML").val().toLowerCase();
      Session.set('nameMailingList', nom);
      $("#inputNomML").val("");

      $('#apercuMail').slimScroll({
        height: '250px'
      });
    }
  },

  "submit #formEmailMailing":function(event){
    if (!event.isDefaultPrevented()) {
      event.preventDefault();

      var email = $("#inputTextMail").val().toLowerCase();
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
          var email = $(this).val().toLowerCase();
          if (validationMail(email)) {
            return email;
          }else {
            error = true;
          }
        }).get();
    if(!error) {
      Session.set('emailsMailingList', emails);
      var emailsBd = mailingList.findOne({_id : Session.get('idMailingList')});
      if(!emailsBd) {
        mailingList.insert({"nom": Session.get('nameMailingList'), "emails": Session.get('emailsMailingList')});
        swal("Création","Mailing list créé", "success");
      }else {
        mailingList.update(Session.get('idMailingList'), {$set: { nom: Session.get('nameMailingList'), emails: Session.get('emailsMailingList') }});
        swal("Modification","Mailing list modifié", "success");
      }
      resetApercu();
    }else {
      swal("Erreur!","Un des emails est invalide!", "error");
    }

  },

  "click .deleteMailing": function(event) {
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
          mailingList.remove(id);
          swal("Suppression!", "La mailing list à été supprimé.", "success");
        });

  },

  "change #selectListe": function(){
    var id = $('#selectListe').val();
    if(id) {
      var mailsBd = mailingList.findOne({_id : id});
      Session.set("idMailingList", id);
      Session.set("nameMailingList", mailsBd.nom);
      Session.set("emailsMailingList", mailsBd.emails);
    }
  },

  "change #importMail": function(event) {
    var file = event.target.files[0];

    var data = [];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        _.each(results.data, function(result) {
          _.each(result, function(email) {
            if(!_.isEmpty(email)) {
              if(validationMail(email)) {
                data.push(email);
              }
            }
          })
        });
        Session.set("emailsMailingList", _.uniq(Session.get("emailsMailingList").concat(data)));
      }
    });

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

doublonName = function (nom) {
    var nameExist = (_.findWhere(mailingList.find().fetch(), {nom: nom}));
    return !!nameExist;
}

resetApercu = function(){
  $('#selectListe').prop('selectedIndex',0);
  Session.set("idMailingList", "");
  Session.set("nameMailingList", "");
  Session.set("emailsMailingList", []);
};




