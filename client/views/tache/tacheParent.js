Template.newTacheParent.rendered = function() {
    $("#insertTag").tagsinput();
    $('.bootstrap-tagsinput').addClass('form-control');
    $('.bootstrap-tagsinput input').removeAttr('style');
    $('.datetimepicker').datetimepicker({
        format: 'L - LT',
        locale: 'fr',
        minDate: moment().add(1, 'd')
    });
    tinymce.init({
        selector: 'textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        language: 'fr_FR'
    });
    Session.set('typeTache', 'parent');
};

Template.updateTacheParent.rendered = Template.newTacheParent.rendered;
