import React, {Component} from 'react';
import InputWrapper from 'shared/utils/InputWrapper';

export default class EasyBox extends Component {
  changeItem(event) {
    if (event.target.value) {
      let realValue = event.target.value.match(/[0-9]/g);
      realValue && (event.target.value = realValue.join(''))
    }

    if (typeof this.props.onChange === 'function')
      this.props.onChange(event);
    else
      this.props.formItem.onChange(event);
  }

  render() {
    let formItem = this.props.formItem;
    // formItem = InputWrapper(formItem);


    return (
      <div className="easy-box">
        <div className="easy-box-label">
          {this.props.label}
        </div>
        <div className="easy-box-content">
          <input value={formItem.value && (formItem.name == 'pvp' ? parseFloat(formItem.value).toLocaleString('es-ES') + ' €' : formItem.value) || ''} type="text" disabled={this.props.disabled} onChange={::this.changeItem}/>
        </div>
      </div>
    );
  }
}
