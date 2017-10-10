import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import Alert from 'react-s-alert';

export class Admin extends Component {

    removeAllUsers(e) {
        Meteor.call('removeAllUsers', (e, r) => {
            if (e !== undefined) {
                Alert.error('Removing users failed: ' + e.reason);
            } else {
                Alert.success('All users removed.');
            }
        });
    }

    removeAllTransactions(e) {
        Meteor.call('removeAllTransactions', (e, r) => {
            if (e !== undefined) {
                Alert.error('Removing transactions failed: ' + e.reason);
            } else {
                Alert.success('All transactions removed.');
            }
        });
    }

    notBeingClickedAtAll(e) {
        Alert.info('You have been picked as one of the winners!');
    }

    render() {
        return (
            <div style={{'paddingTop': '20px'}}>
                <Button block bsStyle="primary" onClick={this.removeAllUsers.bind(this)}>
                    Remove all users
                </Button>

                <Button block bsStyle="primary" onClick={this.removeAllTransactions.bind(this)}>
                    Remove all transactions
                </Button>

                <Button block bsStyle="danger" onClick={this.notBeingClickedAtAll.bind(this)}>
                    Do not click me!
                </Button>
            </div>
        );
    }
}






