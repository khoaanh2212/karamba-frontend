import React, {Component} from 'react';
import LoginMenu from 'view/components/menu/LoginMenu';
import AdminMenu from 'view/components/menu/AdminMenu';

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="header-container">
                    <a href="#" className="title">carnovo</a>
                    {this.props.auth.isLogged ?
                        <AdminMenu /> :
                        <LoginMenu />
                    }
                </div>
            </header>
        )
    }
}
