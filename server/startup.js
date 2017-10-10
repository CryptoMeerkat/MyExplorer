import {Meteor} from 'meteor/meteor';
import '../imports/api/db/transactions.js';
import '../imports/api/db/users.js';
import '../imports/api/api.js';
import * as TransactionProcessor from '../imports/api/transactionProcessor.js';

Meteor.startup(() => {
    TransactionProcessor.start();
});
