import React from 'react';
import {
    Button,
    Panel,
    Col,
    FormControl,
    FormGroup,
    Form,
    ControlLabel,
    Alert
} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';

export class AddTransaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            details: this.clearTransactionDetails(),
            error: false,
            errorDetail: null,
            success: false,
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
                this.setState({
                    error: true,
                    errorDetail: e.reason
                });
            } else {
                this.setState({
                    details: Object.assign({}, this.clearTransactionDetails()),
                    success: true
                });
            }
        });

    }

    handleChange(e) {
        const details = this.state.details;
        details[e.target.id] = e.target.value;

        this.setState({
            error: false,
            success: false,
            details: details,
        });
    }

    render() {
        return (
            <Panel header="Add Transaction">
                {!this.state.error ? null :
                    <Alert bsStyle="danger">
                        Transaction submitting failed Error: {JSON.stringify(this.state.errorDetail)}
                    </Alert>
                }
                {!this.state.success ? null :
                    <Alert bsStyle="success">
                        Transaction posted!
                    </Alert>
                }
                <Form horizontal>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            From
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text"
                                         placeholder={'Username'}
                                         value={this.state.details.from}
                                         id='from'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            To
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text"
                                         placeholder={'Username'}
                                         value={this.state.details.to}
                                         id='to'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Amount
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text"
                                         value={this.state.details.amount}
                                         id='amount'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Currency
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select"
                                         value={this.state.details.currency}
                                         onChange={this.handleChange.bind(this)}>
                                <option value="BTC">BTC</option>
                                <option value="ETH">ETH</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <Button bsStyle="primary" onClick={this.postTransaction.bind(this)}>
                        Send
                    </Button>
                </Form>
            </Panel>
        );
    }
}






