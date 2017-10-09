import {Mongo} from 'meteor/mongo';
import moment from 'moment';
import {Meteor} from 'meteor/meteor';
import * as Users from "./users.js";

export const Transactions = new Mongo.Collection('transactions');

export function getAll() {
    return Transactions.find({}, {sort: {timestampCreated: -1}}).fetch();
}

export function get(id) {
    return Transactions.find({_id: id}).fetch();
}

export const STATE = {
    UNKNOWN: "UNKNOWN",
    SUBMITTED: "SUBMITTED",
    DONE: "DONE",
    INVALID: "INVALID",
};

// Concurrency issues: Adding and fetching in different scopes.
// Maybe no issue, due to JS one core principle
const transactionsToProcess = [];

export function add(transaction) {
    const sourceUserId = transaction.sourceUserId;
    const targetUserId = transaction.targetUserId;
    const currencyType = transaction.currencyType;
    const currencyAmount = parseFloat(transaction.currencyAmount);

    Transactions.insert(
        {
            sourceUserId,
            targetUserId,
            currencyType,
            currencyAmount,
            timestampProcessed: null,
            timestampCreated: moment(),
            state: STATE.SUBMITTED
        },
        function(err) {
            // In case the initial insert has failed, we cannot even set a nice state
            if (err) {
                throw Meteor.Error('Unsubmitted Transaction')
            } else {
                transactionsToProcess.push(transaction._id);
                setTimeout(_processTransaction, 2500);
            }
        }
    );
}

function _processTransaction() {
    const id = transactionsToProcess.shift();
    const t = get(id);

    if (t.currencyAmount <= 0
        || !Users.isValid(t.sourceUserId)
        || (t.currencyType !== 'BTC' && t.currencyType !== 'ETH')
        || !Users.hasFunds(t.currencyAmount, t.currencyType)) {

        Transactions.update({
            _id: id
        }, {
            $set: {
                timestampProcessed: moment(),
                state: STATE.INVALID
            }
        });
    }

    Transactions.update({
        _id: id
    }, {
        $set: {
            timestampProcessed: moment(),
            state: STATE.DONE
        }
    });
}
