import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import config from 'config';
import LoginForm from './components/LoginForm.component';
import ErrorBox from 'shared/components/ErrorBox.component';
import {LoginPropsBindings, LoginDispatchBindings} from "./Login.bindings";

@connect(LoginPropsBindings, LoginDispatchBindings)
export default class Login extends Component {
  componentWillUnmount() {
    this.props.removeErrors();
  }

  render() {
    const {onSubmit, errorMessage} = this.props;
    return (
      <div id="login-main">
        <Helmet {...config.app.head}/>
        {errorMessage ? <ErrorBox message={errorMessage}/> : null}
        <div id="login-form">
          <LoginForm onSubmit={onSubmit} title="Dealer dashboard login"/>
        </div>
      </div>
    );
  }
}
