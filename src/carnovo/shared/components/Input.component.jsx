import React, {Component} from 'react';
import InputWrapper from 'shared/utils/InputWrapper';

export default class Input extends Component {
  render() {
    let propsForm = InputWrapper(this.props);
    (propsForm.value == null || typeof propsForm.value == "undefined") && (propsForm.value = "");
    let type = this.props.type ? this.props.type : 'text';

    return (
      <div className="form-input">
        <label htmlFor={this.props.labelId}>
          {this.props.label}
        </label>
        <input {...propsForm} id={this.props.labelId}
                              placeholder={this.props.placeholder}
                              type={type}
                              disabled={this.props.disabled}/>
      </div>
    );
  }
}
