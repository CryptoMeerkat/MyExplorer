import React, {Component} from 'react';
import {Label} from 'react-bootstrap';

export class Transaction extends Component {

    render() {

        let style = "default";

        if (this.props.state === "UNKNOWN") {
            style = "default";
        } else if (this.props.state === "SUBMITTED") {
            style = "info";
        } else if (this.props.state === "DONE") {
            style = "success";
        } else if (this.props.state === "INVALID") {
            style = "danger";
        }

        return (
            <tr>
                <td>{this.props.from}</td>
                <td>{this.props.to}</td>
                <td>{this.props.amount.toFixed(8)}</td>
                <td>{this.props.currency}</td>
                <td><Label bsStyle={style}>{this.props.state}</Label></td>
            </tr>
        );
    }
}






