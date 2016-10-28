import React, {Component} from 'react';
import {connect} from 'react-redux';
import ErrorBox from 'shared/components/ErrorBox.component';
import {browseHistory} from 'react-router';
import RegisterProgressBar from '../components/RegisterProgressBar.component';
import RegisterHeader from "../components/RegisterHeader.component";
import SignUpBoard from './components/SignUpBoard.component';
import { ClientRegisterPropsBinding, ClientRegisterDispatchBinding } from "./ClientRegister.bindings";

@connect(ClientRegisterPropsBinding, ClientRegisterDispatchBinding)
export default class EmailVerify extends Component {
    constructor() {
        super();
        this.state = {
            step: 4,
            email: '',
            errorMessage: '',
            showPopup: false
        }
    }

    onEmailChanged(e) {
        this.setState({email: e.target.value});
    }

    registerEmail() {
        let regEx = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        let email = this.state.email;
        if (email && regEx.test(email)) {
            this.setState({errorMessage: '', email: email});
            this.props.registerEmail(this.state.email);
            this.showPopup();
        } else {
            this.setState({errorMessage: 'Email is not valid !'});
        }
    }

    registerClient(name, email, postCode, password) {
        this.props.registerClient(name, email, postCode, password, this.props.carAppliance);
    }

    hidePopup() {
        this.setState({
            showPopup: false
        });
    }

    showPopup() {
        this.setState({
            showPopup: true
        });
    }

    render() {
        return (
            <div id="register-car" className="container-fluid no-padding">
              <div className="container">
                  <RegisterProgressBar step={this.state.step}/>
              </div>

              <RegisterHeader header="¡Solicitar ofertas!" subHeader="Al hacer clic en la casilla usted indica estar de acuerdo con nuestros términos y condiciones, y nuestra política de privacidad."/>

              <div id="email-verify">
                  {this.state.errorMessage ? <ErrorBox message={this.state.errorMessage}/> : null}
                  <div className="content">
                      <input type="text" className="email" value={this.state.email} onChange={::this.onEmailChanged}
                             placeholder="Email"/>
                      <div className="icon"></div>
                      <p>(No lo compartiremos con los concesionarios)</p>
                  </div>

                  <div className="bottom">
                      <button className="btn btn-default btn-md" onClick={::this.registerEmail}>Solicitar ofertas!
                      </button>
                      <p>Al hacer click en el botón usted está de acuerdo con nuestros Términos y Condiciones y nuestra
                          política de Privacidad.</p>
                  </div>
                  {this.state.showPopup ? <SignUpBoard hidePopup={::this.hidePopup} toast={this.props.toast} postcode={this.props.postcode} email={this.props.email} carAppliance={this.props.carAppliance} registerClient={::this.props.registerClient}/> : ""}
                  {this.state.showPopup ? <div className="fade" onClick={::this.hidePopup}></div> : ""}
              </div>
            </div>
        )
    }

}
