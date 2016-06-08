Template.newTacheDocument.rendered = function() {
    $("#insertTag").tagsinput();
    $('.bootstrap-tagsinput').addClass('form-control');
    $('.bootstrap-tagsinput input').removeAttr('style');
    $('#datetimepicker1').datetimepicker({
        format: 'L - LT',
        locale: 'fr',
        minDate: moment()
    });
    $('#datetimepicker2').datetimepicker({
        format: 'L - LT',
        locale: 'fr',
        useCurrent: false
    });
    $("#datetimepicker1").on("dp.change", function (e) {
        $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker2").on("dp.change", function (e) {
        $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
    });
    tinymce.init({
        selector: 'textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        language: 'fr_FR'
    });
    Session.set('typeTache', 'document');
};

Template.updateTacheDocument.rendered = Template.newTacheDocument.rendered;

var eventDocument = {
    "change .select_document": function(event){
        var _id = $(event.target).val();
        if(!_.isEmpty(_id)) {
            var file = uploads.findOne({_id: _id});
            $('#previewDocument').attr("src", "/uploads/"+file.userId+"/"+file.file);
            $('#previewDocument').attr("alt", file.file);

            $("#previewDocument").error(function () {
                $(this).unbind("error").attr("src", "http://fakeimg.pl/350x200/?text=aucun%20aper%C3%A7u");
            });
        }
    },
    "change .select_categorie": function(event){
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
}

Template.newTacheDocument.events(eventDocument);
Template.updateTacheDocument.events(eventDocument);