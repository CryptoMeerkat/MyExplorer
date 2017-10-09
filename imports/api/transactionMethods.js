import {Meteor} from 'meteor/meteor';
import * as Transactions from './db/transactions.js';

Meteor.publish('tran23sactions', function() {
    return Transactions.TransactionCollection.find({});
});

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('transactions', function() {
        return Transactions.TransactionCollection.find({});
    });
}

Meteor.methods({
    postTransaction: function(transaction) {
        return Transactions.add(transaction);
    },
});