import React, {Component} from 'react';

export default class EasySection extends Component {
  render() {
    return (
      <div className="manufacturer-row">
        <div className="small-m-block manufacturer-left">
          <div className="manufacturer-title">
            {this.props.label ? <span>{this.props.label}</span> : null}
          </div>
        </div>
        <div className="big-m-block manufacturer-right manufacturer-title">
          {this.props.children}
        </div>
      </div>
    );
  }
}
