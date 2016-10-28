import React, {Component} from 'react';
import InputWrapper from 'shared/utils/InputWrapper';

export default class Input extends Component {
    render() {
        let propsForm = InputWrapper(this.props);

        return (
            <div className="form-input">
                <label htmlFor={this.props.labelId}>
                    {this.props.label}
                </label>
                <input {...propsForm} type="text" id={this.props.labelId} placeholder={this.props.placeholder}/>
            </div>
        );
    }
}
