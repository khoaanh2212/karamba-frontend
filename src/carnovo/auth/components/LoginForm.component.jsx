import React, {Component} from 'react';

export default class LoginForm extends Component {

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.username.value, this.password.value);
  }

  render() {
    return (
      <div className="contactFormDiv">
        <h2>{this.props.title}</h2>
        <form className="contactForm" onSubmit={this.onSubmit.bind(this)}>
          <input type="text" className="input-login" ref={node => {this.username = node }}
                 placeholder="Username"/>
          <input type="password"
                 className="input-login" ref={node => {this.password = node }}
                 placeholder="Password"/>

          <input type="submit" className="button-login" value="Login"/>
        </form>
      </div>
    );
  };
}
