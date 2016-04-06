Template.newCategorie.rendered = function() {
    $('#colorpicker1').colorpicker({
        customClass: 'colorpicker-2x',
        sliders: {
            saturation: {
                maxLeft: 150,
                maxTop: 150
            },
            hue: {
                maxTop: 150
            },
            alpha: {
                maxTop: 150
            }
        },
        colorSelectors: {
            'default': '#777777',
            'primary': '#337ab7',
            'success': '#5cb85c',
            'info': '#5bc0de',
            'warning': '#f0ad4e',
            'danger': '#d9534f'
        }
    });
};

AutoForm.addHooks('newCategorie', {
    after: {
        insert: function(error) {
            if (error) {
                swal("Erreur", "Erreur a l'insertion!", "error");
            } else {
                sweetAlert({   title: "Réussi !",   text: "La catégorie à bien été créée",   type: "success", confirmButtonText: "OK"}, function(){ Router.go(Utils.pathFor('categoriesHome')) });
            }
        }
    }
},true);
