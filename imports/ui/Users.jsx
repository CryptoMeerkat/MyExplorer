import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

export class Users extends Component {
    render() {
        return (
            <div style={{'padding-top': '20px'}}>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>BTC</th>
                        <th>ETH</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.users.map((u) => (
                            <tr>
                                <td>{u.name}</td>
                                <td>{u.bitcoinAmount.toFixed(8)}</td>
                                <td>{u.ethereumAmount.toFixed(8)}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}






