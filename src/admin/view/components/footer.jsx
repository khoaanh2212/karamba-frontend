import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer-container">
                    <a href="#" className="title">carnovo</a>

                    <ul className="admin-menu">
                        <li><Link to="/admin/terms">Terms & Conditions</Link></li>
                        <li><Link to="/admin/privacy">Privacy Policy</Link></li>
                        <li><Link to="/admin/sitemap">Sitemap</Link></li>
                    </ul>
                </div>
            </footer>
        )
    }
}