Template.newTacheParent.rendered = function() {
    tinymce.init({
        selector: '.textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        language: 'fr_FR'
    });
    Session.set('typeTache', 'parent');
};

Template.updateTacheParent.rendered = Template.newTacheParent.rendered;
