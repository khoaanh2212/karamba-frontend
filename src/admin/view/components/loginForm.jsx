import React from 'react';

export default class AdminLoginForm extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.username.value, this.password.value);
    }

    render() {
        return (
            <div className="contactFormDiv">
                <h2>Login to your dashboard</h2>
                <form className="contactForm" onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" className="input-login" ref={node => {this.username = node }}
                           placeholder="Username"/>
                    <input type="password" className="input-login" ref={node => {this.password = node }}
                           placeholder="Password"/>

                    <input type="submit" className="button-login" value="Login"/>
                </form>
            </div>
        );
    };
}