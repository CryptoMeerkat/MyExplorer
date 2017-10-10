import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {
    Grid,
    Row,
    Col,
} from 'react-bootstrap';
import * as Transactions from '../api/db/transactions.js';

import {History} from './History.jsx';
import {AddUser} from './AddUser.jsx';
import {AddTransaction} from './AddTransaction.jsx';
import Alert from 'react-s-alert';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={5}>
                        <Row>
                            <AddUser/>
                        </Row>
                        <Row>
                            <AddTransaction/>
                        </Row>
                    </Col>
                    <Col xs={7}>
                        {!this.props.loaded ? null :
                            <History transactions={this.props.transactions}/>
                        }
                    </Col>
                </Row>

                <Alert stack={{limit: 3}} html={false} effect='slide' position='top-right' timeout={3000}/>
            </Grid>
        );
    }
}

export default createContainer(() => {
    const transactionHandle = Meteor.subscribe('transactions');
    const transactions = Transactions.TransactionCollection.find({}, {sort: {timestampCreated: -1}}).fetch() || [];
    const loaded = transactionHandle.ready();

    return {
        transactions: transactions,
        loaded: loaded
    };
}, App);