Template.header.helpers({
    "active":function(path){
        if(Router.current().route._path === path){
            return "active";
        }
    }
});