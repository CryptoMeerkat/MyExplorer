import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';

export const UsersCollection = new Mongo.Collection('users');

const BITCOIN_ID_LENGTH = 52;
const ETHEREUM_ID_LENGTH = 52;

export function getUserByName(userName) {
    return UsersCollection.findOne({name: userName});
}

export function changeFunds(name, currency, amount, cb) {
    var currencyProperty = '';
    if (currency === 'BTC') {
        currencyProperty = 'bitcoinAmount';
    } else if (currency === 'ETH') {
        currencyProperty = 'ethereumAmount';
    }

    const user = getUserByName(name);

    if (user[currencyProperty] + amount < 0) {
        cb('Not enough funds', null);
    } else {
        UsersCollection.update(
            {name: name},
            {$set: {[currencyProperty]: user[currencyProperty] + amount}},
            {},
            (e, r) => cb(e, r)
        );
    }
}


export function addUser(details) {
    check(details.name, String);
    check(details.description, String);
    check(details.email, String);
    check(details.bitcoinId, String);
    check(details.bitcoinAmount, String);
    check(details.ethereumId, String);
    check(details.ethereumAmount, String);
    check(details.transactionLimit, String);

    const name = details.name;
    const description = details.description;
    const email = details.email;
    const bitcoinId = details.bitcoinId;
    const ethereumId = details.ethereumId;
    const bitcoinAmount = parseFloat(details.bitcoinAmount);
    const ethereumAmount = parseFloat(details.bitcoinAmount);
    const transactionLimit = parseFloat(details.transactionLimit);

    if (name.length >= 512
        || description.length >= 1024
        || email.length >= 1024
        || bitcoinId.length >= BITCOIN_ID_LENGTH
        || ethereumId.length >= ETHEREUM_ID_LENGTH
        || bitcoinAmount < 0
        || bitcoinAmount > 1
        || ethereumAmount < 0
        || ethereumAmount > 1
        || transactionLimit < 0) {
        throw new Meteor.Error('500', 'Data types not valid');
    }

    if (this.getUserByName(details.name) !== undefined) {
        throw new Meteor.Error('500', 'Username taken');
    }

    UsersCollection.insert({
        name,
        description,
        email,
        bitcoinId,
        bitcoinAmount,
        ethereumId,
        ethereumAmount,
        transactionLimit
    });
}