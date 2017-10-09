import {Mongo} from 'meteor/mongo';

export const Users = new Mongo.Collection('users');

export function isValid(userId) {
    return true;//Transactions.find({}, {sort: {createdAt: -1}}).fetch();
}

export function hasFunds(amount, type) {
    return true;
}