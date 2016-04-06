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
            '#777777': '#777777',
            '#337ab7': '#337ab7',
            '#5cb85c': '#5cb85c',
            '#5bc0de': '#5bc0de',
            '#f0ad4e': '#f0ad4e',
            '#d9534f': '#d9534f'
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
