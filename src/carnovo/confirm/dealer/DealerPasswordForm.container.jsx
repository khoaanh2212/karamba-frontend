import React, {Component} from 'react';
import Helmet from 'react-helmet';
import config from 'config';
import ui from 'redux-ui';
import {reduxForm} from 'redux-form';
import Input from 'shared/components/Input.component';
import ErrorBox from 'shared/components/ErrorBox.component';
import DealerPasswordUi from './DealerPasswordForm.uistate';
import {
  dealerPasswordStateToPropsBinding,
  dealerPasswordDispatchToPropsBinding
} from "./DealerPasswordForm.bindings";

@ui(DealerPasswordUi)
export class DealerConfirm extends Component {
  render() {
    const {
      fields: {email, password, confirmPassword},
      handleSubmit
    } = this.props;

    return (
      <div id="dealer-confirm">
        <Helmet {...config.app.head}/>
        {this.props.ui.error ? <ErrorBox message={this.props.ui.error}/> : null}
        <div id="dealer-confirmation">
          <form className="dealerConfirmationForm" onSubmit={handleSubmit(this.props.onDealerConfirmRegistration)}>
            <h2>Configurar contraseña</h2>
            <Input {...email} className="input-login" labelId="email" label="Correo electrónico" disabled/>
            <Input {...password} className="input-login" type="password" labelId="password" label="Contraseña" placeholder="1234abcd!"/>
            <Input {...confirmPassword} className="input-login" type="password" labelId="confirmPassword" label="Repetir contraseña" placeholder="1234abcd!"/>
            {confirmPassword.touched && confirmPassword.error && <ErrorBox message={confirmPassword.error}/>}
            <input type="submit" className="button-login" value="Guardar cambios"/>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'DealerPasswordForm',
  fields: ['token', 'email', 'password', 'confirmPassword'],
  validate: (values) => {
    const errors = {};

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden!';
    }

    return errors;
  }
}, dealerPasswordStateToPropsBinding, dealerPasswordDispatchToPropsBinding)(DealerConfirm);
