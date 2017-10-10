import {Meteor} from 'meteor/meteor';
import * as TransactionsAPI from './db/transactions.js';
import * as UsersAPI from './db/users.js';
import moment from 'moment';

// Concurrency issues: Adding and fetching in different scopes.
// Maybe no issue, due to JS one core principle
const transactionsToProcess = [];
let started = false;

function _nextProcessTick() {
    Meteor.setTimeout(processTransaction, 2500);
}

export function start() {
    if (!started) {
        started = true;
        _nextProcessTick();
    }
}

export function push(transactionId) {
    transactionsToProcess.push(transactionId);
}

export function processTransaction() {
    if (transactionsToProcess.length <= 0) {
        _nextProcessTick();
    } else {
        const id = transactionsToProcess.shift();
        const t = TransactionsAPI.getById(id);

        if (t === undefined) {
            _nextProcessTick();
        } else {
            const userFrom = UsersAPI.getUserByName(t.from);
            const userTo = UsersAPI.getUserByName(t.to);

            if (userFrom === undefined
                || userTo === undefined
                || (t.currency !== 'BTC' && t.currency !== 'ETH')
                || t.amount <= 0) {
                _invalidateTransaction(id);
            } else {

                if (t.currency === 'BTC') {
                    if (userFrom.bitcoinAmount < t.amount) {
                        _invalidateTransaction(id);
                        return;
                    }
                } else if (t.currency === 'ETH') {
                    if (userFrom.ethereumAmount < t.amount) {
                        _invalidateTransaction(id);
                        return;
                    }
                }

                if (t.amount > userFrom.transactionLimit) {
                    _invalidateTransaction(id);
                    return;
                }

                UsersAPI.changeFunds(t.from, t.currency, -t.amount,
                    (e, r) => {
                        if (e) {
                            _invalidateTransaction(id);
                        } else {
                            UsersAPI.changeFunds(t.to, t.currency, t.amount,
                                (e, r) => {
                                    if (e) {
                                        _invalidateTransaction(id);
                                    } else {
                                        _finaliseTransaction(id, t);
                                    }
                                });
                        }
                    }
                );
            }
        }
    }
}


function _invalidateTransaction(id) {
    TransactionsAPI.TransactionCollection.update({
        _id: id
    }, {
        $set: {
            timestampProcessed: moment().toDate(),
            state: TransactionsAPI.STATE.INVALID
        }
    });

    _nextProcessTick();
}

function _finaliseTransaction(id, transaction) {
    console.log('==== Transaction processed ====');
    console.log('From: \t' + transaction.from);
    console.log('To: \t\t' + transaction.to);
    console.log('Amount: \t' + transaction.amount.toFixed(8) + ' \t' + transaction.currency);

    TransactionsAPI.TransactionCollection.update({
        _id: id
    }, {
        $set: {
            timestampProcessed: moment().toDate(),
            state: TransactionsAPI.STATE.DONE
        }
    });

    _nextProcessTick();
}

