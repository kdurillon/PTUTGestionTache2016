Template.newTacheDocument.rendered = function() {
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
        }
    }
});