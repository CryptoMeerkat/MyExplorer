import {Mongo} from 'meteor/mongo';
import moment from 'moment';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import * as Users from "./users.js";

import * as TransactionProcessor from "../transactionProcessor.js";


export const TransactionCollection = new Mongo.Collection('transactions');

export function findAll() {
    return TransactionCollection.find({});
}

export function getById(id) {
    return TransactionCollection.findOne({_id: id});
}

export const STATE = {
    UNKNOWN: "UNKNOWN",
    SUBMITTED: "SUBMITTED",
    DONE: "DONE",
    INVALID: "INVALID",
};


export function add(transaction) {
    check(transaction.from, String);
    check(transaction.to, String);
    check(transaction.amount, String);
    check(transaction.currency, String);

    const from = transaction.from;
    const to = transaction.to;
    const amount = parseFloat(transaction.amount);
    const currency = transaction.currency;

    if ((currency !== 'BTC' && currency !== 'ETH')
        || amount <= 0) {
        throw new Meteor.Error('500', 'Data types not valid');
    }

    TransactionCollection.insert(
        {
            from,
            to,
            amount,
            currency,
            timestampProcessed: null,
            timestampCreated: moment().toDate(),
            state: STATE.SUBMITTED
        },
        function(err, res) {
            // In case the initial insert has failed, we cannot even set a nice state
            if (err) {
                throw Meteor.Error('Unsubmitted Transaction');
            } else {
                TransactionProcessor.push(res);
            }
        }
    );
}
