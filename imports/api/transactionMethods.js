import {Meteor} from 'meteor/meteor';
import * as Transactions from './db/transactions.js';

if (Meteor.isServer) {
    Meteor.publish('transactions', function() {
        return Transactions.TransactionCollection.find({});
    });
}

Meteor.methods({
    postTransaction: function(transaction) {
        return Transactions.add(transaction);
    },
    removeAllTransactions: function() {
        return Transactions.TransactionCollection.remove({});
    },
});