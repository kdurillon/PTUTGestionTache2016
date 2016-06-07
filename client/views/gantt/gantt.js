

Template.gantt.rendered = function(){
    gantt.config.initial_scroll = true;
    gantt.config.drag_resize = false;
    gantt.config.drag_progress = false;
    gantt.config.drag = false;
    gantt.config.drag_links = false;
    gantt.config.scroll_on_click = true;
    gantt.config.fit_tasks = true;
    gantt.config.sort = true;
    gantt.config.api_date = "%d/%m %H:%i";
    gantt.config.date_grid = "%d/%m %H:%i";
    gantt.config.start_date = gantt.date.day_start(new Date());

    gantt.config.round_dnd_dates = false;

    gantt.attachEvent("onTaskClick", function (id, e) {

        console.log(e.srcElement.className);

        switch(e.srcElement.className) {
            case 'gantt_tree_icon gantt_open':
                gantt.open(id);
                break;
            case 'gantt_tree_icon gantt_close':
                gantt.close(id);
                break;
            case 'gantt_add':
                Router.go(Utils.pathFor('tacheHome'));
                break;
            default:
                Modal.show('modalInfoTache', function () {
                    return getTache(id);
                });
                gantt.refreshTask(id);
        }


    });

    gantt.attachEvent("onTaskCreated", function(task){
        Modal.show('newTacheParentModal');
    });



    gantt.init("princ");

$('#selectCategorie').on('change',function(){
    var value = this.value;
    if(value !== 'Catégorie'){

    gantt.clearAll();
    var userTasks = taches.find({userId: Meteor.userId(), categorie: value}).fetch();

    userTasks.forEach(function(task){
        if(task.categorie != undefined){
            var cat =  categories.findOne({nom: task.categorie});
            var couleur = cat.couleur;
            var text = 'white';
        }
        else if(task.fini == true){
            var couleur = 'lightgrey';
            var text = 'black';
        }
        else {
            var couleur = "white";
            var text = 'black';
        }

        if(task.dateFin != undefined){
            if (task.tacheParent != undefined){
                gantt.addTask({
                    id: task._id,
                    text: task.titre,
                    start_date: task.dateCreation,
                    end_date: task.dateFin,
                    color: couleur,
                    textColor: text,
                    parent: task.tacheParent
                })}else{
                gantt.addTask({
                    id: task._id,
                    text: task.titre,
                    start_date: task.dateCreation,
                    end_date: task.dateFin,
                    color: couleur,
                    textColor: text
                })
            }


        }else{
            if (task.typeTache === 'parent'){
                gantt.addTask({
                    id: task._id,
                    text: task.titre,
                    start_date: task.dateCreation,
                    color: couleur,
                    textColor: text,
                    type:'project'
                })
            }
            else{
                if (task.tacheParent != undefined){
                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        duration: 30,
                        color: couleur,
                        textColor: text,
                        parent: task.tacheParent
                    })
                }else{
                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        duration: 30,
                        color: couleur,
                        textColor: text
                    })
                }
            }
        }


    });

}else{
        gantt.clearAll();
        reset();
    }
});

    $('#searchText').on('keyup',function(){
        var value = this.value;
        if(value !== '' && value !== undefined){

            gantt.clearAll();
            var userTasks = taches.find({userId: Meteor.userId(), titre: new RegExp(value)}).fetch();


            userTasks.forEach(function(task){
                if(task.categorie != undefined){
                    var cat =  categories.findOne({nom: task.categorie});
                    var couleur = cat.couleur;
                    var text = 'white';
                }
                else if(task.fini == true){
                    var couleur = 'lightgrey';
                    var text = 'black';
                }
                else {
                    var couleur = "white";
                    var text = 'black';
                }

                if(task.dateFin != undefined){
                    if (task.tacheParent != undefined){
                        gantt.addTask({
                            id: task._id,
                            text: task.titre,
                            start_date: task.dateCreation,
                            end_date: task.dateFin,
                            color: couleur,
                            textColor: text,
                            parent: task.tacheParent
                        })}else{
                        gantt.addTask({
                            id: task._id,
                            text: task.titre,
                            start_date: task.dateCreation,
                            end_date: task.dateFin,
                            color: couleur,
                            textColor: text
                        })
                    }


                }else{
                    if (task.typeTache === 'parent'){
                        gantt.addTask({
                            id: task._id,
                            text: task.titre,
                            start_date: task.dateCreation,
                            color: couleur,
                            textColor: text,
                            type:'project'
                        })
                    }
                    else{
                        if (task.tacheParent != undefined){
                            gantt.addTask({
                                id: task._id,
                                text: task.titre,
                                start_date: task.dateCreation,
                                duration: 30,
                                color: couleur,
                                textColor: text,
                                parent: task.tacheParent
                            })
                        }else{
                            gantt.addTask({
                                id: task._id,
                                text: task.titre,
                                start_date: task.dateCreation,
                                duration: 30,
                                color: couleur,
                                textColor: text
                            })
                        }
                    }
                }


            });

        }else{
            gantt.clearAll();
            reset();
        }
    });

    $('#showArchive').on('click',function(){
        gantt.clearAll();
        var userTasks = taches.find({userId: Meteor.userId()}).fetch();

        userTasks.forEach(function(task){
            if(task.categorie != undefined){
                var cat =  categories.findOne({nom: task.categorie});
                var couleur = cat.couleur;
                var text = 'white';
            }
            else if(task.fini == true){
                var couleur = 'lightgrey';
                var text = 'black';
            }
            else {
                var couleur = "white";
                var text = 'black';
            }

            if(task.dateFin != undefined){
                if (task.tacheParent != undefined){
                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        end_date: task.dateFin,
                        color: couleur,
                        textColor: text,
                        parent: task.tacheParent
                    })}else{
                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        end_date: task.dateFin,
                        color: couleur,
                        textColor: text
                    })
                }


            }else{
                if (task.typeTache === 'parent'){
                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        color: couleur,
                        textColor: text,
                        type:'project'
                    })
                }
                else{
                    if (task.tacheParent != undefined){
                        gantt.addTask({
                            id: task._id,
                            text: task.titre,
                            start_date: task.dateCreation,
                            duration: 30,
                            color: couleur,
                            textColor: text,
                            parent: task.tacheParent
                        })
                    }else{
                        gantt.addTask({
                            id: task._id,
                            text: task.titre,
                            start_date: task.dateCreation,
                            duration: 30,
                            color: couleur,
                            textColor: text
                        })
                    }
                }
            }


        });

        if($('#showArchive').hasClass('btn-success')){
            $('#showArchive').html('Cacher les tâches archivées');
            $('#showArchive').removeClass('btn-success');
            $('#showArchive').addClass('btn-warning');
        }
        else{
            $('#showArchive').html('Afficher les tâches archivées');
            $('#showArchive').removeClass('btn-warning');
            $('#showArchive').addClass('btn-success');
        }




    });

    function reset(){
        var userTasks = taches.find({userId: Meteor.userId(), fini: false}).fetch();

        userTasks.forEach(function(task){
            if(task.categorie != undefined){
                var cat =  categories.findOne({nom: task.categorie});
                var couleur = cat.couleur;
                var text = 'white';
            }
            else {
                var couleur = "white";
                var text = 'black';
            }

            if(task.dateFin != undefined){
                if (task.tacheParent != undefined){
                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        end_date: task.dateFin,
                        color: couleur,
                        textColor: text,
                        parent: task.tacheParent
                    })}else{
                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        end_date: task.dateFin,
                        color: couleur,
                        textColor: text
                    })
                }


            }else{
                if (task.typeTache === 'parent'){
                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        color: couleur,
                        textColor: text,
                        type:'project'
                    })
                }
                else{
                    if (task.tacheParent != undefined){
                        gantt.addTask({
                            id: task._id,
                            text: task.titre,
                            start_date: task.dateCreation,
                            duration: 30,
                            color: couleur,
                            textColor: text,
                            parent: task.tacheParent
                        })
                    }else{
                        gantt.addTask({
                            id: task._id,
                            text: task.titre,
                            start_date: task.dateCreation,
                            duration: 30,
                            color: couleur,
                            textColor: text
                        })
                    }
                }
            }


        });
    }
};



Template.gantt.helpers({
    initTasks: function(){
            var userTasks = taches.find({userId: Meteor.userId(), fini: false}).fetch();

        userTasks.forEach(function(task){
            if(task.categorie != undefined){
              var cat =  categories.findOne({nom: task.categorie});
                var couleur = cat.couleur;
                var text = 'white';
            }
            else {
                var couleur = "white";
                var text = 'black';
            }

            if(task.dateFin != undefined){
                if (task.tacheParent != undefined){
                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        end_date: task.dateFin,
                        color: couleur,
                        textColor: text,
                        parent: task.tacheParent
                    })}else{
                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        end_date: task.dateFin,
                        color: couleur,
                        textColor: text
                    })
                }


            }else{
                if (task.typeTache === 'parent'){
                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        color: couleur,
                        textColor: text,
                        type:'project'
                    })
                }
                else{
                    if (task.tacheParent != undefined){
                        gantt.addTask({
                            id: task._id,
                            text: task.titre,
                            start_date: task.dateCreation,
                            duration: 30,
                            color: couleur,
                            textColor: text,
                            parent: task.tacheParent
                        })
                    }else{
                        gantt.addTask({
                            id: task._id,
                            text: task.titre,
                            start_date: task.dateCreation,
                            duration: 30,
                            color: couleur,
                            textColor: text
                        })
                    }
                }
            }


        });
    },

});




