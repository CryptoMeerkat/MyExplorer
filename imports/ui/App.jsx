import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, Table, Grid, Row, Panel, Col, FormControl, FormGroup, Form, ControlLabel} from 'react-bootstrap';

import * as Transactions from '../api/db/transactions.js';

import {History} from './History.jsx';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <Panel header="Add Currency">
                            <Form>
                                <FormGroup>
                                    <Col sm={2} componentClass={ControlLabel}>
                                        Value
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="text" placeholder={'0.00000000'}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col sm={2} componentClass={ControlLabel}>
                                        Currency
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl componentClass="select" placeholder="btc">
                                            <option value="btc">BTC</option>
                                            <option value="eth">ETH</option>
                                        </FormControl>
                                    </Col>
                                </FormGroup>

                                <Button bsStyle="primary" type="submit">
                                    Add Currency
                                </Button>
                            </Form>
                        </Panel>
                    </Col>
                </Row>


                <Row>
                    <Col xs={12}>
                        <Panel header="Add Transaction">
                            <Form>

                                <FormGroup>
                                    <Col sm={2} componentClass={ControlLabel}>
                                        From
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="text" placeholder={'MY TRANSACTION ID'}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col sm={2} componentClass={ControlLabel}>
                                        To
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="text" placeholder={''}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col sm={2} componentClass={ControlLabel}>
                                        Amount
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="text" placeholder={''}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col sm={2} componentClass={ControlLabel}>
                                        Currency
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl componentClass="select" placeholder="btc">
                                            <option value="btc">BTC</option>
                                            <option value="eth">ETH</option>
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                {' '}
                                <Button bsStyle="primary" type="submit">
                                    Send
                                </Button>
                            </Form>
                        </Panel>
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