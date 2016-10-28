import React, {Component} from 'react';
import Notifications from 'react-notification-system-redux';

export default class SignUpBoard extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: ''
        };
    }

    onNameChanged(e) {
        this.setState({ name: e.target.value});
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value});
    }

    showInfo(message) {
        let notificationOpts = {
          message: message,
          position: 'bc',
          autoDismiss: 2
        };
        this.props.toast(Notifications.info(notificationOpts));
    }

    registerClient() {
        if (this.state.name.trim() && this.state.password.trim()) {
            this.props.registerClient(this.state.name, this.props.email, this.props.postcode, this.state.password, this.props.carAppliance);
            this.props.hidePopup();
            this.showInfo(<div><strong>Datos guardados.</strong> El catálogo se ha actualizado </div>);
        }
    }

    render() {
        return (<div className="popup-signup">
            <div className="content-popup">
                <div className="close-btn">
                    <i className="ic-close" onClick={event => this.props.hidePopup()}></i>
                </div>
                <h3>Thanks for signing up!</h3>
                <p>We just need a few details</p>
                <div className="fields">
                    <div className="field-details">
                        <label>Tu nombre</label>
                        <input type="text" placeholder="ej: Pedro Martin" onChange={::this.onNameChanged}/>
                    </div>
                    <div className="field-details">
                        <label>Choose a password</label>
                        <input type="password" placeholder="Password" onChange={::this.onPasswordChanged}/>
                    </div>
                </div>
                <button onClick={::this.registerClient}>A tu showroom</button>
            </div>
        </div>);
    }
}
