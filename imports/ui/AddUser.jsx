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

export class AddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            details: this.clearUserDetails(),
            error: false,
            errorDetail: null,
            success: false,
        };
    }

    clearUserDetails() {
        return {
            name: '',
            description: '',
            email: '',
            bitcoinId: '',
            bitcoinAmount: '0.00000000',
            ethereumId: '',
            ethereumAmount: '0.00000000',
            transactionLimit: '1.00000000'
        };
    }

    addUser() {
        Meteor.call('addUser', this.state.details, (e, r) => {
            if (e !== undefined) {
                this.setState({
                    error: true,
                    errorDetail: e.reason
                });
            } else {
                this.setState({
                    details: Object.assign({}, this.clearUserDetails()),
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
            <Panel header="Add User">
                {!this.state.error ? null :
                    <Alert bsStyle="danger">
                        User cannot be added. Invalid data provided. Error: {JSON.stringify(this.state.errorDetail)}
                    </Alert>
                }
                {!this.state.success ? null :
                    <Alert bsStyle="success">
                        User added!
                    </Alert>
                }
                <Form horizontal>
                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text"
                                         placeholder={'Name'}
                                         value={this.state.details.name}
                                         id='name'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Description
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text"
                                         placeholder={'Description'}
                                         value={this.state.details.description}
                                         id='description'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            E-Mail
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text"
                                         placeholder={'E-Mail'}
                                         value={this.state.details.email}
                                         id='email'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Bitcoin
                        </Col>
                        <Col sm={5}>
                            <FormControl type="text"
                                         placeholder={'ID'}
                                         value={this.state.details.bitcoinId}
                                         id='bitcoinId'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                        <Col sm={1}>
                        </Col>
                        <Col sm={4}>
                            <FormControl type="text"
                                         placeholder={'Amount'}
                                         value={this.state.details.bitcoinAmount}
                                         id='bitcoinAmount'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Ethereum
                        </Col>
                        <Col sm={5}>
                            <FormControl type="text"
                                         placeholder={'ID'}
                                         value={this.state.details.ethereumId}
                                         id='ethereumId'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                        <Col sm={1}>
                        </Col>
                        <Col sm={4}>
                            <FormControl type="text"
                                         placeholder={'Amount'}
                                         value={this.state.details.ethereumAmount}
                                         id='ethereumAmount'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={2} componentClass={ControlLabel}>
                            Transaction Limit
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text"
                                         value={this.state.details.transactionLimit}
                                         id='transactionLimit'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <Button bsStyle="primary" onClick={this.addUser.bind(this)}>
                        Add User
                    </Button>
                </Form>
            </Panel>
        );
    }
}






