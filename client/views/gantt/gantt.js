

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
        Modal.show('modalInfoTache', function () {
            return getTache(id);
        });
    });

    gantt.attachEvent("onTaskCreated", function(task){
        Modal.show('newTacheParentModal');
    });



    gantt.init("princ");



};



Template.gantt.helpers({
    initTasks: function(query){

        if (query != undefined){
            console.log('query');
            var userTasks = taches.find(query).fetch();
        }
        else{
            console.log('pas query');
            var userTasks = taches.find({userId: Meteor.userId(), fini: false}).fetch();
        }

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

                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        end_date: task.dateFin,
                        color: couleur,
                        textColor: text
                    })


            }else{
                if (task.typeTache === 'parent'){
                    gantt.addTask({
                        id: task._id,
                        text: task.titre,
                        start_date: task.dateCreation,
                        color: couleur,
                        textColor: text,
                        type:gantt.config.types.project
                    })
                }
                else{
                gantt.addTask({
                    id: task._id,
                    text: task.titre,
                    start_date: task.dateCreation,
                    duration: 30,
                    color: couleur,
                    textColor: text
                })}
            }


        });
    },

});




