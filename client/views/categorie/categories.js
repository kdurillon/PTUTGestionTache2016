Template.categoriesHome.helpers({
   'List': function(){
       return categories.find().fetch();
   }
});

Template.categoriesHome.rendered = function() {
    console.log(categories.find().fetch());
};

Template.categoriesHome.events({
    'click .modif_categorie': function() {
        console.log(this);
    },
    'click .delete_categorie': function() {
        categories.remove(this._id);
    }
});

