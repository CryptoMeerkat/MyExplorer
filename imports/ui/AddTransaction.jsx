import React from 'react';
import {
    Button,
    Panel,
    Col,
    FormControl,
    FormGroup,
    Form,
    ControlLabel
} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import Alert from 'react-s-alert';

export class AddTransaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            details: this.clearTransactionDetails()
        };
    }

    clearTransactionDetails() {
        return {
            from: '',
            to: '',
            amount: '0.00000001',
            currency: 'BTC',
        };
    }

    postTransaction() {
        Meteor.call('postTransaction', this.state.details, (e, r) => {
            if (e !== undefined) {
                Alert.error('Transaction submitting failed. Error: ' + e.reason);
            } else {
                this.setState({
                    details: Object.assign({}, this.clearTransactionDetails())
                });
                Alert.success('Transaction posted!');

            }
        });

    }

    handleChange(e) {
        const details = this.state.details;
        details[e.target.id] = e.target.value;

        this.setState({
            details: details,
        });
    }

    render() {

        const decriptionWidth = 3;
        const fieldsWidth = 12 - decriptionWidth;

        return (
            <Panel header={<strong>Add Transaction</strong>}>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={decriptionWidth} componentClass={ControlLabel}>
                            From
                        </Col>
                        <Col sm={fieldsWidth}>
                            <FormControl type="text"
                                         placeholder={'Username'}
                                         value={this.state.details.from}
                                         id='from'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={decriptionWidth} componentClass={ControlLabel}>
                            To
                        </Col>
                        <Col sm={fieldsWidth}>
                            <FormControl type="text"
                                         placeholder={'Username'}
                                         value={this.state.details.to}
                                         id='to'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={decriptionWidth} componentClass={ControlLabel}>
                            Amount
                        </Col>
                        <Col sm={fieldsWidth}>
                            <FormControl type="text"
                                         value={this.state.details.amount}
                                         id='amount'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={decriptionWidth} componentClass={ControlLabel}>
                            Currency
                        </Col>
                        <Col sm={fieldsWidth}>
                            <FormControl componentClass="select"
                                         value={this.state.details.currency}
                                         onChange={this.handleChange.bind(this)}>
                                <option value="BTC">BTC</option>
                                <option value="ETH">ETH</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <Button block bsStyle="primary" onClick={this.postTransaction.bind(this)}>
                        Send
                    </Button>
                </Form>
            </Panel>
        );
    }
}






