import React, {Component} from 'react';
import {Link} from 'react-router';

export default class LoginMenu extends Component {
    render() {
        return (
            <ul className="admin-menu">
                <li>
                    <Link to="/admin/login">Login</Link>
                </li>
            </ul>
        )
    }
}