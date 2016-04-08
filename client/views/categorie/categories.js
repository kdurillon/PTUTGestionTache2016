Template.categoriesHome.helpers({
   'List': function(){
       return categories.find().fetch();
   }
});

Template.categoriesHome.events({
    'click .modif_categorie': function() {
        Router.go(Utils.pathFor('updateCategorie',{_id: this._id}));
    },
    'click .delete_categorie': function() {
        categories.remove(this._id);
    }
});

