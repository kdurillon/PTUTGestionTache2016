Template.tacheMail.rendered = function() {
    $("#insertTag").tagsinput();
    $('.bootstrap-tagsinput').addClass('form-control');
    $('.bootstrap-tagsinput input').removeAttr('style');
    $('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY - LT',
        locale: 'fr',
        minDate: moment()
    });
    tinymce.init({
        selector: 'textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        language: 'fr_FR'
    });
    $("#typeTache").val('mail');
};

Template.tacheMail.events({
    "change .select_categorie":function(event){
        var nom = $(event.target).val();
        if(!_.isEmpty(nom)) {
            var couleur = categories.findOne({nom : nom}).couleur;
            $('#selectedColor').css('background-color', couleur);
        }
    }
});
