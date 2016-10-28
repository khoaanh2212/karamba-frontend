import React, {Component} from 'react';
import InputWrapper from 'shared/utils/InputWrapper';

export default class Textarea extends Component {
    render() {
        let propsForm = InputWrapper(this.props);
        (propsForm.value == null || typeof propsForm.value == "undefined") && (propsForm.value = "");

        return (
            <div className="form-input">
                <label htmlFor={this.props.labelId}>
                    {this.props.label}
                </label>
                <textarea {...propsForm} id={this.props.labelId} placeholder={this.props.placeholder}/>
            </div>
        );
    }
}
