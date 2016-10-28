import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {ClientProfileToPropsBinding, ClientProfileDispatchToPropsBinding} from "./ClientProfile.bindings";
import EasyButton from '../../../shared/components/EasyComponents/EasyButton.component';
import ErrorBox from '../../../shared/components/ErrorBox.component';
import Input from '../../../shared/components/Input.component';
import {browserHistory} from 'react-router';

export default class ClientProfile extends Component {
  state = {
    showChangePass: false,
    error: null
  };

  inputs = {
  };

  toggleChangePass() {
    this.setState({showChangePass: !this.state.showChangePass});
    if (!this.state.showChangePass) {
      this.inputs.newPassword = "";
      this.inputs.confirmNewPassword = "";
    }
  }

  setError(message) {
    this.setState({
      error: message
    });
  }

  dataIsValid(values) {
    let valid = true;
    if (values.name == "") {
      valid = false;
      this.setError('La nombre es un campo obligatorio!');
    }
    if (values.zipCode == "") {
      valid = false;
      this.setError('El código postal es un campo obligatorio!');
    }
    if (values.newPassword !== values.confirmNewPassword) {
      valid = false;
      this.setError('Las contraseñas no coinciden!');
    } else if (!!values.newPassword) {
      values.password = values.newPassword;
    }
    return valid;
  }

  render() {
    let submit = (data) => {
      if(this.dataIsValid(data)){
        this.setError(null);
        this.setState({
          showChangePass: false
        });
        this.props.updateClient(data, this.props.token);
      }else{
        window.scrollTo(0, 0);
      }
    };

    const {
      fields: { name, email, zipCode, password, newPassword, confirmNewPassword },
      handleSubmit
    } = this.props;

    return (
      <div className="client-profile">
        <form onSubmit={handleSubmit(submit)}>
          <div className="greeting">
            Ajustes
            <div className="more">
              Puede actualizar la configuración de su cuenta aquí. Los cambios en su código postal cuando actualizará la distancia en todas sus ofertas existentes y ayudar a encontrar con los distribuidores locales en construye un nuevo coche.
            </div>
          </div>
          {
            this.state.error?
              <div>
                <ErrorBox message={this.state.error}/>
              </div>
              :""
          }
          <div className="profile-wrapper">
            <div className="row">
              <div className="col-md-5"><label htmlFor="name"> Name </label></div>
              <div className="col-md-6">
                <Input {...name} labelId="name" />
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-md-5"><label htmlFor="mail"> Email </label></div>
              <div className="col-md-6">
                <Input {...email} disabled labelId="mail" />
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-md-5"><label htmlFor="password"> Password </label></div>
              <div className="col-md-6">
                <Input {...password} labelId="password" value="**********" disabled/>
                <div className="change-pass disable-select" onClick={::this.toggleChangePass}>Modificar password</div>
              </div>
            </div>
            {this.state.showChangePass ?
              <div>
                <div className="row">
                  <div className="col-md-5"><label htmlFor="newPassword"> Nuevo password </label></div>
                  <div className="col-md-6">
                    <Input {...newPassword} labelId="newPassword" type="password"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5"><label htmlFor="confirmNewPassword"> Confirmar password </label></div>
                  <div className="col-md-6">
                    <Input {...confirmNewPassword} labelId="confirmNewPassword" type="password"/>
                  </div>
                </div>
              </div> : null}
            <hr/>
            <div className="row bottom-high">
              <div className="col-md-5"><label htmlFor="zipCode"> Código postal </label></div>
              <div className="col-md-6">
                <Input {...zipCode} labelId="zipCode" />
              </div>
            </div>
          </div>
          <div className="profile-submit">
            <div className="row">
              <EasyButton position="center" type="submit" label="Siguiente"/>
            </div>

            <div className="row find-mail disable-select bottom-high">
              o<span> date de baja de todos los emails</span>
            </div>
          </div>
          <div className="rating">
            <div className="row">
              <div className="link disable-select" onClick={(e)=> browserHistory.push(process.env.PUBLIC_PATH + 'client/review')}>¿Ha comprado un coche de un concesionario de carnovo?</div>
              <div className="desc">¡Cuéntanos tu experiencia y obtener <span>un regalo!</span></div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'clientProfileForm',
  fields: ['name', 'email', 'password', 'newPassword', 'confirmNewPassword', 'zipCode', 'token']
}, ClientProfileToPropsBinding, ClientProfileDispatchToPropsBinding)(ClientProfile);
