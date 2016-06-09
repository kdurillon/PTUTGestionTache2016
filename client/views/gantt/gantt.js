

Template.gantt.rendered = function(){
    gantt.config.initial_scroll = true;
    gantt.config.drag_move = false;
    gantt.config.drag_progress = false;
    gantt.config.drag = false;
    gantt.config.drag_links = false;
    gantt.config.scroll_on_click = true;
    gantt.config.fit_tasks = true;
    gantt.config.sort = true;
    gantt.config.api_date = "%d/%m %H:%i";
    gantt.config.date_grid = "%d/%m %H:%i";
    gantt.config.start_date = gantt.date.day_start(new Date());
    gantt.config.show_errors = false;
    gantt.config.round_dnd_dates = false;

    gantt.attachEvent("onTaskDrag", function(id, mode, task){

        var newEndDate = moment(new Date(task.end_date)).format("DD/MM/YYYY - hh:mm");
        var newStartDate = moment(new Date(task.start_date)).format("DD/MM/YYYY - hh:mm");

        taches.update(
            id,{
            $set :
            {
                dateFin: newEndDate,
                dateCreation: newStartDate
            }}
        )
    });

    gantt.attachEvent("onTaskClick", function (id, e) {

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
        Router.go('/tache/parent');
    });

    gantt.init("princ");

$('#selectCategorie').on('change',function(){
    var value = this.value;
    if(value !== 'Catégorie'){

    gantt.clearAll();
    var userTasks = taches.find({userId: Meteor.userId(), categorie: value}).fetch();

    userTasks.forEach(function(task){
        var couleur = "white";
        var text = 'black';
        if(!_.isUndefined(task.categorie)){
            var cat =  categories.findOne({nom: task.categorie});
            couleur = cat.couleur;
            text = 'white';
        }
        else if(task.fini === true){
            couleur = 'lightgrey';
            text = 'black';
        }
        addGant(task, couleur, text);
    });

}else{
        gantt.clearAll();
        reset();
    }
});

    $('#searchText').on('keyup',function(){
        var value = this.value;
        var userTasks = taches.find({userId: Meteor.userId(), titre: new RegExp(value,'i')}).fetch();
        if(!_.isEmpty(value) && !_.isUndefined(value)){
            if ($('#selectCategorie').val() !== 'Catégorie'){
                gantt.clearAll();
                userTasks = taches.find({userId: Meteor.userId(), titre: new RegExp(value,'i'), categorie: $('#selectCategorie').val()}).fetch();


                userTasks.forEach(function(task){
                    var couleur = "white";
                    var text = 'black';
                    if(!_.isUndefined(task.categorie)){
                        var cat =  categories.findOne({nom: task.categorie});
                        couleur = cat.couleur;
                        text = 'white';
                    }
                    else if(task.fini === true){
                        couleur = 'lightgrey';
                        text = 'black';
                    }
                    addGant(task, couleur, text);
                });
            }else{
                gantt.clearAll();

                userTasks.forEach(function(task){
                    var couleur = "white";
                    var text = 'black';
                    if(!_.isUndefined(task.categorie)){
                        var cat =  categories.findOne({nom: task.categorie});
                        couleur = cat.couleur;
                        text = 'white';
                    }
                    else if(task.fini === true){
                        couleur = 'lightgrey';
                        text = 'black';
                    }
                    addGant(task, couleur, text);
                });
            }


        }else{
            gantt.clearAll();
            reset();
        }
    });

    $('#showArchive').on('click',function(){
        gantt.clearAll();
        var userTasks = taches.find({userId: Meteor.userId()}).fetch();

        userTasks.forEach(function(task){
            var couleur = "white";
            var text = 'black';
            if(!_.isUndefined(task.categorie)){
                var cat =  categories.findOne({nom: task.categorie});
                couleur = cat.couleur;
                text = 'white';
            }
            else if(task.fini === true){
                couleur = 'lightgrey';
                text = 'black';
            }
            addGant(task, couleur, text);
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

    $('#rst').on('click',function(){
        $('#searchText').val('');
        $('#selectCategorie').val('Catégorie');
        gantt.clearAll();
        reset();
    });

    $('#export').on('click',function(){
        swal({
            title: "Choisissez le format",
            text: "Dans quel format voulez-vous exporter le gantt ?",
            type: "info",
            showCancelButton: false,
            showConfirmButton: false,
            html: "Dans quel format voulez-vous exporter votre gantt ?<br>" +
            "<button id='btn_png' class='styled btn-warning'>PNG</button>" +
            "<button id='btn_pdf' class='styled btn-info'>PDF</button>"
        });

        $('#btn_pdf').on('click', function() {
            swal.close();
            gantt.exportToPDF();
        });

        $('#btn_png').on('click', function() {
            swal.close();
            gantt.exportToPNG();
        });
    });


    /**
     *
     */
    function reset(){
        var userTasks = taches.find({userId: Meteor.userId(), fini: false}).fetch();

        userTasks.forEach(function(task){
            var couleur = "white";
            var text = 'black';
            if(!_.isUndefined(task.categorie)){
                var cat =  categories.findOne({nom: task.categorie});
                couleur = cat.couleur;
                text = 'white';
            }
            addGant(task, couleur, text);
        });
    }
};



Template.gantt.helpers({
    initTasks: function(){
        var userTasks = taches.find({userId: Meteor.userId(), fini: false}).fetch();
        if(!_.isUndefined(userTasks)){
            userTasks.forEach(function(task){
                var couleur = "white";
                var text = 'black';
                if(!_.isUndefined(task.categorie)){
                    var cat =  categories.findOne({nom: task.categorie});
                    couleur = cat.couleur;
                    text = 'white';
                }
                addGant(task, couleur, text);
            });
        }
    }

});

addGant = function(task, couleur, text) {
    if(!_.isUndefined(task.dateFin)){
        if (!_.isUndefined(task.tacheParent)){
            gantt.addTask({
                id: task._id,
                text: task.titre,
                start_date: task.dateCreation,
                end_date: task.dateFin,
                color: couleur,
                textColor: text,
                parent: task.tacheParent._id
            })
        }else{
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
            if (!_.isUndefined(task.tacheParent)){
                gantt.addTask({
                    id: task._id,
                    text: task.titre,
                    start_date: task.dateCreation,
                    duration: 30,
                    color: couleur,
                    textColor: text,
                    parent: task.tacheParent._id
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
};


