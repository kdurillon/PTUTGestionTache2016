Template.updateCategorie.rendered = function() {
    Session.set('typeCategorie','update');
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

AutoForm.addHooks('updateCategorie', {
    after: {
        update: function() {
            sweetAlert({
                title: "Réussi !",
                text: "La catégorie à bien été mise à jour",
                type: "success",
                confirmButtonText: "OK"
            }, function(){
                Router.go(Utils.pathFor('categoriesHome'))
            });
        }
    }
},true);
