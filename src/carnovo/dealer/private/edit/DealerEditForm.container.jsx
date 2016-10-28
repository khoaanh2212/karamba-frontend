import React, {Component} from 'react';
import Helmet from 'react-helmet';
import config from 'config';
import {reduxForm} from 'redux-form';
import Input from 'shared/components/Input.component';
import Textarea from 'shared/components/Textarea.component';
import ErrorBox from 'shared/components/ErrorBox.component';
import TabMenu from 'shared/components/TabMenu.component';
import Conditions from './components/Conditions.component';
import InputWrapper from 'shared/utils/InputWrapper';
import {
  dealerEditFormStateToPropsBinding,
  dealerEditFormDispatchToPropsBinding
} from "./DealerEditForm.bindings";

export class DealerEditForm extends Component {
  componentWillMount() {
    this.setState({
      avatar: this.props.profile.avatar,
      background: this.props.profile.background,
      error: null
    });
  }

  addCondition(condition) {
    let condValues = this.props.fields.generalConditions.value;
    let condValuesLen = condValues.length;
    let i=0;
    let exist = condValues[i];

    for (;i < condValuesLen; exist = condValues[++i]) {
      if (exist.id == condition.id) {
        return false;
      }
    }

    let newConditions = [...this.props.fields.generalConditions.value, condition];
    this.props.fields.generalConditions.onChange(newConditions);
  }

  removeCondition(condition) {
    let newConditions = this.props.fields.generalConditions.value.filter(cond => {
      return cond.id !== condition.id;
    });
    this.props.fields.generalConditions.onChange(newConditions);
  }

  _getBase64FromFile(file, field) {
    var reader = new FileReader();
    reader.onload = (() => {
      return function (e) {
        this.setState(prevState => {
          let newState = {...prevState};
          newState[field] = e.target.result;
          return newState;
        });
      };
    })(file).bind(this);
    reader.readAsDataURL(file);
  }

  changeAvatar(avatar) {
    let updatedAvatar = avatar.target.files[0];
    this.props.fields.avatar.onChange(updatedAvatar);
    this._getBase64FromFile(updatedAvatar, 'avatar');
  }

  changeBackground(background) {
    let updatedBackground = background.target.files[0];
    this.props.fields.background.onChange(updatedBackground);
    this._getBase64FromFile(updatedBackground, 'background');
  }

  render() {
    const {
      fields: {name, address, zipCode, avatar, background, confirmPassword, generalConditions, vendorName, vendorRole, email, password, schedule, deliveryConditions, specialConditions},
      handleSubmit
    } = this.props;

    let submit = (data) => {
      if(dataIsValid(data)){
        this.props.onUpdateDealer(data, this.props.token);
      }else{
        window.scrollTo(0, 0);
      }
    };

    let setError = (message) => {
      this.setState({
        error: message
      });
    };

    let dataIsValid = (values) => {
      let valid = true;
      if ((values.password || values.confirmPassword) && (values.password !== values.confirmPassword)) {
        valid = false;
        setError('Las contraseñas no coinciden!');
      }
      if (values.address == "") {
        valid = false;
        setError('La dirección es un campo obligatorio!');
      }
      if (values.zipCode == "") {
        valid = false;
        setError('El código postal es un campo obligatorio!');
      }
      return valid;
    };

    let tabs = [
      {key: "Perfil", link: "/dealer/profile/edit"},
      {key: "Valoraciones", link: "/dealer/profile/valuations"}
    ];

    return (
      <div id="dealer-edit-form">
        <Helmet {...config.app.head}/>
        <div id="dealer-confirmation">
          <form onSubmit={handleSubmit(submit)}>
            <div className="fixed-image edit-background"
                 style={{backgroundImage: "url('" + this.state.background + "'"}}>
              <div className="avatar-container edit-avatar"
                   style={{backgroundImage: "url('" + this.state.avatar +"')"}}>
                <label htmlFor="upload-avatar"><i className="material-icons">photo_camera</i></label>
                <input id="upload-avatar"
                       onChange={::this.changeAvatar}
                       style={{display: 'none'}}
                       type="file" {...InputWrapper({avatar})}
                       value=""/>
              </div>
              <div className="cambiarFoto">
                <i className="material-icons">photo_camera</i>
                <label htmlFor="upload-background"><span>Cambiar foto de encabezado</span></label>
                <input id="upload-background"
                       onChange={::this.changeBackground}
                       style={{display: 'none'}}
                       type="file" {...InputWrapper({background})}
                       value=""/>
              </div>
            </div>
            <TabMenu tabs={tabs}/>
            <div className="text-edit-form">

              <div style={{margin: '20px', display: this.state.error ? 'block' : 'none'}}>
                <ErrorBox message={this.state.error}/>
              </div>

              <h3>Perfil del vendedor
                <small>(Campos obligatorios)</small>
              </h3>
              <Input {...vendorName} labelId="vendorName" label="Nombre completo" placeholder="Bill Gates"/>
              <Input {...vendorRole} labelId="vendorRole" label="Cargo" placeholder="Responsable de ventas"/>
              <Input {...email} labelId="email" label="Correo electrónico" disabled={true}
                     placeholder="e.g. adria@cochazos-adria.com"/>
              <Input {...password} labelId="password" type="password" label="Contraseña" placeholder="1234abcd!"/>
              <Input {...confirmPassword} type="password" labelId="confirmPassword" label="Repetir contraseña"
                     placeholder="1234abcd!"/>

              <h3>Perfil del concesionario</h3>
              <Input {...name} labelId="name" label="Nombre del concesionario"
                     placeholder="Pepecar"/>
              <Input {...address} labelId="address" label="Dirección"
                     placeholder="Calle North, 1, Barcelona"/>
              <Input {...zipCode} labelId="zipCode" label="Código Postal"
                     placeholder="08001"/>

              <h3>Información del concesionario</h3>
              <Textarea {...schedule} labelId="schedule" label="Horario"
                        placeholder="Click aquí para escribir..."/>
              <Textarea {...deliveryConditions} labelId="deliveryConditions" label="Política de entrega"
                        placeholder="Click aquí para escribir..."/>
              <Textarea {...specialConditions} labelId="specialConditions" label="Información adicional"
                        placeholder="Click aquí para escribir..."/>

              <Conditions label="Condiciones especiales"
                          generalConditions={generalConditions}
                          conditions={this.props.conditions}
                          onConditionChange={this.props.fields.generalConditions}
                          placeholder="Añade otra condición"/>

              <button type="submit" className="button-success">Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'dealerEditForm',
  fields: ['name', 'phone', 'token', 'avatar', 'background', 'address', 'zipCode', 'token', 'vendorName', 'vendorRole', 'email', 'password', 'confirmPassword', 'schedule', 'deliveryConditions', 'specialConditions', 'generalConditions']
}, dealerEditFormStateToPropsBinding, dealerEditFormDispatchToPropsBinding)(DealerEditForm);
