import React, {Component} from 'react';

export default class UserErrors extends Component {
    render() {
        return (
            <div id="errors">
                <div className="error">
                    {this.props.errors.map((error, key) => {
                        return <h3 key={key}>{error.errorMessage}</h3>
                    })}
                </div>
            </div>
        )
    }
}