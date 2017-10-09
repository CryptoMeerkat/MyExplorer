import React, {Component} from 'react';
import {Button, Table, Grid, Row, Panel, Col, FormControl, FormGroup, Form, ControlLabel} from 'react-bootstrap';

export class History extends Component {

    constructor(props) {
        super(props);

        this.state = {
            transactions: this.props.transactions,
            filter: ""
        };
    }

    filterTransactions(e) {
        const userId = e.target.value;

        this.setState(function(prevState, props) {
            return {
                transactions: prevState.transactions.filter(t => t.id === userId)
            }
        });

    }

    render() {
        return (

            <Panel header="History">
                <Form horizontal>
                    <FormGroup>
                        <Col sm={1} componentClass={ControlLabel}>
                            User ID
                        </Col>
                        <Col sm={11}>
                            <FormControl type="text"
                                         value={this.state.filter}
                                         placeholder={'OWN USER ID'}
                                         onChange={this.filterTransactions}/>
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
                        this.state.transactions.map((t) => (
                            <Transaction {...t} />
                        ))
                    }
                    </tbody>
                </Table>
            </Panel>
        );
    }
}






