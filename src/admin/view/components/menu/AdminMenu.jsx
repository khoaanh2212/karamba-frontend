import React, {Component} from 'react';
import {Link} from 'react-router';

export default class AdminMenu extends Component {
    render() {
        return (
            <ul className="admin-menu">
                <li>
                    <Link to="/admin/panel">Panel</Link>
                </li>
                <li>
                    <Link to="/admin/logout">Logout</Link>
                </li>
            </ul>
        )
    }
}