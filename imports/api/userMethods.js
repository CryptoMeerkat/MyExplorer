import {Meteor} from 'meteor/meteor';
import * as Users from './db/users.js';

Meteor.methods({
    addUser: function(details) {
        return Users.addUser(details);
    },
});