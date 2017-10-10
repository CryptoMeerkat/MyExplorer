import {Meteor} from 'meteor/meteor';
import * as Transactions from './db/transactions.js';
import * as Users from './db/users.js';

if (Meteor.isServer) {
    Meteor.publish('users', function() {
        return Users.UsersCollection.find({});
    });
    Meteor.publish('transactions', function() {
        return Transactions.TransactionCollection.find({});
    });
}

Meteor.methods({
    addUser: function(details) {
        return Users.addUser(details);
    },
    removeAllUsers: function() {
        return Users.UsersCollection.remove({});
    },
    postTransaction: function(transaction) {
        return Transactions.add(transaction);
    },
    removeAllTransactions: function() {
        return Transactions.TransactionCollection.remove({});
    },
});