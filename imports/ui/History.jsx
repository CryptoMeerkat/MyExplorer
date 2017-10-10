import React, {Component} from 'react';
import {Button, Table, Grid, Row, Panel, Col, FormControl, FormGroup, Form, ControlLabel} from 'react-bootstrap';
import {Transaction} from './Transaction.jsx';

export class History extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: ""
        };
    }

    filterTransactions(e) {
        this.setState({
            filter: e.target.value
        });
    }

    render() {

        const filter = this.state.filter;
        const transactions = this.props.transactions.filter(function(t) {
            if (filter !== '') {
                return t.from.includes(filter) || t.to.includes(filter);
            }
            return true;
        });

        return (

            <Panel header={<strong>History</strong>}>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Username
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text"
                                         value={this.state.filter}
                                         placeholder={'Username'}
                                         onChange={this.filterTransactions.bind(this)}/>
                        </Col>
                    </FormGroup>
                </Form>

                <Table responsive>
                    <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        transactions.map((t, i) => (
                            <Transaction key={i} {...t} />
                        ))
                    }
                    </tbody>
                </Table>
            </Panel>
        );
    }
}






