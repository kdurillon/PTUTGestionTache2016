AutoForm.addHooks('newCategorie', {
    after: {
        insert: function(error) {
            if (error) {
                swal("Erreur", "Erreur a l'insertion!", "error");
            } else {
                sweetAlert({   title: "Réussi !",   text: "La catégorie à bien été créée",   type: "success", confirmButtonText: "OK"});
            }
        }
    }
},true);
