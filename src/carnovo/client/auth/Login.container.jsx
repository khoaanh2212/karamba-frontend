import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ErrorBox from 'shared/components/ErrorBox.component';
import {LoginPropsBindings, LoginDispatchBindings} from "./Login.bindings";

@connect(LoginPropsBindings, LoginDispatchBindings)
export default class Login extends Component {
    componentWillUnmount() {
      this.props.removeErrors();
    }

    onSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.email.value, this.password.value);
    }

    render() {
        const {onSubmit, errorMessage} = this.props;
        return (
            <div id="client-login">
              {errorMessage ? <ErrorBox message={errorMessage}/> : null}
              <div className="container">
                  <div className="header">
                      <h3>Login usuario</h3>
                  </div>
                  <div className="body">
                      <form onSubmit={::this.onSubmit}>
                          <div className="fields">
                              <input type="email" className="input-data" ref={node => {this.email = node }} placeholder="Email"/>
                              <input type="password" className="input-data" ref={node => {this.password = node }}  placeholder="Password"/>
                          </div>
                          <div className="sub-action">
                              <label className="remember">
                                  <input type="checkbox" name="remember-me"/>
                                  <span>Remember me</span>
                              </label>
                              <label className="forgot-password">¿Recordar contraseña?</label>
                          </div>
                          <input type="submit" value="Login" className="btn-login"/>
                      </form>
                      <div className="more-action">
                          <div>
                              <p className="thin-text">¿No tienes una cuenta de carnovo?</p>
                              <Link to={process.env.PUBLIC_PATH}>
                                <span className="blue-label">¡Configura el coche de tus sueños ahora!</span>
                              </Link>
                          </div>
                          <div>
                              <p className="bold-text">¿Eres un concesionario carnovo?</p>
                              <Link to={process.env.PUBLIC_PATH + "dealer/login"}>
                                  <span className="blue-label">Login de concesionarios</span>
                              </Link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}
