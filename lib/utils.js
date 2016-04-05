Utils = {
    formatDate: function(date) {
        var date = new Date(date);

        var day = date.getDate().toString();
        var month = (date.getMonth() + 1).toString();
        var year = date.getFullYear();

        if (day.length === 1) {
            day = '0' + day;
        }

        if (month.length === 1) {
            month = '0' + month;
        }

        return day + '/' + month + '/' + year;
    },
    pathFor: function(routeName, params){
        // Similaire au helper "pathFor", mais utilisable directement dans le code
        var route = Router.routes[routeName].path(params);
        return route;
    }
};
