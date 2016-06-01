Template.newTacheDocument.rendered = function() {
    $("#insertTag").tagsinput();
    $('.bootstrap-tagsinput').addClass('form-control');
    $('.bootstrap-tagsinput input').removeAttr('style');
    tinymce.init({
        selector: 'textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        language: 'fr_FR'
    });
    $("#typeTache").val('document');
};

Template.newTacheDocument.events({
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
    }
});