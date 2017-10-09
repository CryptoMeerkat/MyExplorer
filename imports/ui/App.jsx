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

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <AddUser/>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <AddTransaction/>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <History transactions={this.props.transactions}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default createContainer(() => {
    return {
        transactions: Transactions.getAll(),
    };
}, App);