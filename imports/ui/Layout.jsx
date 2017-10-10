import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {
    Grid,
    Row,
    Col,
    Tabs, Tab
} from 'react-bootstrap';
import * as TransactionsAPI from '../api/db/transactions.js';
import * as UsersAPI from '../api/db/users.js';
import {History} from './History.jsx';
import {AddUser} from './AddUser.jsx';
import {AddTransaction} from './AddTransaction.jsx';
import {Admin} from './Admin.jsx';
import {Users} from './Users.jsx';
import Alert from 'react-s-alert';

class Layout extends Component {
    render() {
        return (
            <Grid style={{'paddingTop': '20px'}}>
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
                        <Tabs defaultActiveKey={1} id='defaultTabs'>
                            <Tab eventKey={1} title={<strong>History</strong>}>
                                {!this.props.transactionsLoaded ? null :
                                    <History transactions={this.props.transactions}/>
                                }
                            </Tab>
                            <Tab eventKey={2} title={<strong>Users</strong>}>
                                {!this.props.usersLoaded ? null :
                                    <Users users={this.props.users}/>
                                }
                            </Tab>
                            <Tab eventKey={3} title={<strong>Admin</strong>}>
                                <Admin/>
                            </Tab>
                        </Tabs>
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
    const transactions = TransactionsAPI.TransactionCollection.find({}, {sort: {timestampCreated: -1}}).fetch() || [];
    const transactionsLoaded = transactionHandle.ready();

    const usersHandle = Meteor.subscribe('users');
    const users = UsersAPI.UsersCollection.find({}).fetch() || [];
    const usersLoaded = usersHandle.ready();

    return {
        transactions: transactions,
        transactionsLoaded: transactionsLoaded,

        users: users,
        usersLoaded: usersLoaded
    };
}, Layout);