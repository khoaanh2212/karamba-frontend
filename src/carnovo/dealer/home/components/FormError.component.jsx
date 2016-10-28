import React, {Component} from 'react';
import InputWrapper from 'utils/InputWrapper';

export default class FormError extends Component {
    render() {
        return (
            <div className="form-error">
                <h3>{this.props.message}</h3>
            </div>
        );
    }
}
