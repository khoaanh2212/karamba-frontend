import React, {Component} from 'react';

export default class EasyButton extends Component {
  render() {
    return (
      <div className="easy-button">
        <button type={this.props.type} className={this.props.position} onClick={this.props.onSubmit} disabled={this.props.disabled}>
          {this.props.label}
        </button>
      </div>
    )
  }
}
