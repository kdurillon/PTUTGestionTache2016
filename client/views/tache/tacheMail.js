Template.tacheMail.rendered = function() {
    $("#insertTag").tagsinput();
    $('.bootstrap-tagsinput').addClass('form-control');
    $('.bootstrap-tagsinput input').removeAttr('style');
    $('.datepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        locale: 'fr',
        minDate: moment().add(1, 'days')
    });
    $('.timepicker').datetimepicker({
        format: 'LT',
        locale: 'fr'
    });
    tinymce.init({
        selector: 'textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        language: 'tiny_mce_fr'
    });
    $("#typeTache").val('mail');
};

Template.tacheMail.helpers({
    categorieOptions: function() {
        return categories.find().map(function (c) {
            return {label: c.nom, value: c.nom};
        });
    },
    mailingListOptions: function() {
        return mailingList.find().map(function (c) {
           return {label: c.nom, value: c.nom};
        });
    }
});

Template.tacheMail.events({
    "change .select_categorie":function(event){
        var nom = $(event.target).val();
        if(!_.isEmpty(nom)) {
            var couleur = categories.findOne({nom : nom}).couleur;
            $('#selectedColor').css('background-color', couleur);
        }
    }
});

AutoForm.addHooks('tacheMail', {
    after: {
        insert: function(error) {
            if (error) {
                swal("Erreur", "Erreur a l'insertion!", "error");
            } else {
                sweetAlert({
                    title: "Réussi !",
                    text: "La tâche à été créé correctement",
                    type: "success",
                    confirmButtonText: "OK"
                }, function(){
                    Router.go(Utils.pathFor('tacheHome'))
                });
            }
        }
    }
},true);
