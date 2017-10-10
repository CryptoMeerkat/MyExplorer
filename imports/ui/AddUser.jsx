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

export class AddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            details: this.clearUserDetails(),
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
                Alert.error('User cannot be added. Error: ' + e.reason);
            } else {
                this.setState({
                    details: Object.assign({}, this.clearUserDetails())
                });
                Alert.success('User added!');
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
        const fieldWidthHalf = fieldsWidth / 2 - 1;

        return (
            <Panel header={<strong>Add User</strong>}>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={decriptionWidth} componentClass={ControlLabel}>
                            Name
                        </Col>
                        <Col sm={fieldsWidth}>
                            <FormControl type="text"
                                         placeholder={'Name'}
                                         value={this.state.details.name}
                                         id='name'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={decriptionWidth} componentClass={ControlLabel}>
                            Description
                        </Col>
                        <Col sm={fieldsWidth}>
                            <FormControl type="text"
                                         placeholder={'Description'}
                                         value={this.state.details.description}
                                         id='description'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={decriptionWidth} componentClass={ControlLabel}>
                            E-Mail
                        </Col>
                        <Col sm={fieldsWidth}>
                            <FormControl type="text"
                                         placeholder={'E-Mail'}
                                         value={this.state.details.email}
                                         id='email'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={decriptionWidth} componentClass={ControlLabel}>
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
                        <Col sm={decriptionWidth} componentClass={ControlLabel}>
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
                        <Col sm={decriptionWidth} componentClass={ControlLabel}>
                            Transaction Limit
                        </Col>
                        <Col sm={fieldsWidth}>
                            <FormControl type="text"
                                         value={this.state.details.transactionLimit}
                                         id='transactionLimit'
                                         onChange={this.handleChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <Button block bsStyle="primary" onClick={this.addUser.bind(this)}>
                        Add User
                    </Button>
                </Form>
            </Panel>
        );
    }
}






