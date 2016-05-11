Template.tacheMailingList.rendered = function() {
    $("#insertTag").tagsinput();
    $('.bootstrap-tagsinput').addClass('form-control');
    $('.datepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        locale: 'fr'
    });
    $('.timepicker').datetimepicker({
        format: 'LT',
        locale: 'fr'
    });
};

Template.tacheMailingList.helpers({
    categorieOptions: function() {
        return categories.find().map(function (c) {
            return {label: c.nom, value: c._id};
        });
    },
    mailingListOptions: function() {
        return mailingList.find().map(function (c) {
           return {label: c.name, value: c._id};
        });
    }
});

Template.tacheMailingList.events({
    "change .select_categorie":function(event){
        var id = $(event.target).val();
        if(!_.isEmpty(id)) {
            var couleur = categories.findOne({_id : id}).couleur;
            $('#selectedColor').css('background-color', couleur);
        }
    }
});

AutoForm.addHooks('tacheMailingList', {
    after: {
        insert: function() {
            sweetAlert({
                title: "Réussi !",
                text: "La tâche à été créé correctement",
                type: "success",
                confirmButtonText: "OK"
            }, function(){
                Router.go(Utils.pathFor('tachesHome'))
            });
        }
    }
},true);