import {Meteor} from 'meteor/meteor';
import * as Users from './db/users.js';

if (Meteor.isServer) {
    Meteor.publish('users', function() {
        return Users.UsersCollection.find({});
    });
}

Meteor.methods({
    addUser: function(details) {
        return Users.addUser(details);
    },
    removeAllUsers: function() {
        return Users.UsersCollection.remove({});
    },
});