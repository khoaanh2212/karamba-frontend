import React, {Component} from 'react';

export default class errorBox extends Component {
    render() {
        return (
            <div id="errors">
                <div className="error">
                    <h3>{this.props.message}</h3>
                </div>
            </div>
        );
    }
}
