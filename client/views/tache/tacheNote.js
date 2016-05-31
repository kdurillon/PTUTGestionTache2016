Template.newTacheNote.rendered = function() {
    $("#insertTag").tagsinput();
    $('.bootstrap-tagsinput').addClass('form-control');
    $('.bootstrap-tagsinput input').removeAttr('style');
    $('.bootstrap-tagsinput input').removeAttr('size');
    $('.datetimepicker').datetimepicker({
        format: 'L - LT',
        locale: 'fr',
        minDate: moment().add(10, 'm')
    });
    tinymce.init({
        selector: 'textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        language: 'fr_FR'
    });
    $("#typeTache").val('note');
};

Template.updateTacheNote.rendered = Template.newTacheNote.rendered;

var eventNote = {
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
Template.newTacheNote.events(eventNote);
Template.updateTacheNote.events(eventNote);