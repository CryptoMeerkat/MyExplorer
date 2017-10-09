import {Mongo} from 'meteor/mongo';
import moment from 'moment';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import * as Users from "./users.js";

export const TransactionCollection = new Mongo.Collection('transactions');

export function findAll() {
    return TransactionCollection.find({});
}

export function get(id) {
    return TransactionCollection.findOne({_id: id});
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
                transactionsToProcess.push(res);
                Meteor.setTimeout(_processTransaction, 2500);
            }
        }
    );
}

function _invalidateTransaction(id) {
    TransactionCollection.update({
        _id: id
    }, {
        $set: {
            timestampProcessed: moment().toDate(),
            state: STATE.INVALID
        }
    });
}

function _finaliseTransaction(id) {
    TransactionCollection.update({
        _id: id
    }, {
        $set: {
            timestampProcessed: moment().toDate(),
            state: STATE.DONE
        }
    });
}

function _processTransaction() {
    const id = transactionsToProcess.shift();
    const t = get(id);

    const userFrom = Users.getUserByName(t.from);

    if (t.currency === 'BTC') {
        if (userFrom.bitcoinAmount < t.amount) {
            _invalidateTransaction(id);
        }
    } else if (t.currency === 'ETH') {
        if (userFrom.ethereumAmount < t.amount) {
            _invalidateTransaction(id);
        }
    }

    Users.changeFunds(t.from, t.currency, -t.amount,
        (e, r) => {
            if (e) {
                _invalidateTransaction(id);
            } else {
                Users.changeFunds(t.to, t.currency, t.amount,
                    (e, r) => {
                        if (e) {
                            _invalidateTransaction(id);
                        } else {
                            _finaliseTransaction(id);
                        }
                    });
            }
        });

}
