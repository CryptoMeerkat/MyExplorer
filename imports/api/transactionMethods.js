import {Meteor} from 'meteor/meteor';
import * as Transactions from './db/transactions.js';

Meteor.methods({
    postTransaction: function(transaction) {
        return Transactions.add(transaction);
    },

    getTransaction: function() {
        return Transactions.getAll();
    },
});