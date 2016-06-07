Template.newTacheFormulaire.rendered = function() {
    $("#insertTag").tagsinput();
    $('.bootstrap-tagsinput').addClass('form-control');
    $('.bootstrap-tagsinput input').removeAttr('style');
    $('.datetimepicker').datetimepicker({
        format: 'L - LT',
        locale: 'fr'
    });
    tinymce.init({
        selector: 'textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        language: 'fr_FR'
    });
    Session.set('typeTache', 'formulaire');
};

Template.updateTacheFormulaire.rendered = Template.newTacheFormulaire.rendered;

var eventFormulaire = {
    "change .select_categorie": function(event) {
        var nom = $(event.target).val();
        if(!_.isEmpty(nom)) {
            var couleur = categories.findOne({nom : nom}).couleur;
            $('#selectedColor').css('background-color', couleur);
        }
    },
    "click #dateEnable": function(event) {
        if($(event.target).is(':checked')) {
            $(".dateFin").removeAttr('disabled');
        }else{
            $(".dateFin").val('');
            $(".dateFin").attr('disabled', true);
        }
    }
};
Template.newTacheFormulaire.events(eventFormulaire);
Template.updateTacheFormulaire.events(eventFormulaire);