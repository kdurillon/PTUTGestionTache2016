Meteor.publish('getAllUser', function (){
    return Meteor.users.find({});
});