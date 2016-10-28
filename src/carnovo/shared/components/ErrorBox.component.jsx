import React, {Component} from 'react';

export default class ErrorBox extends Component {
    render() {
        return (
            <div id="errorBox">
                <div className="error">
                    <span>{this.props.message}</span>
                </div>
            </div>
        );
    }
}
