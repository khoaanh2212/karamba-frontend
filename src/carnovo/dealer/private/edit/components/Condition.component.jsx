import React, {Component} from 'react';

export default class Condition extends React.Component {
  render() {
    return(
      <div>
        <div className="condition">{this.props.text}</div>
        <div className="delete-condition" onClick={this.props.removeCondition}><i className="material-icons">clear</i></div>
      </div>
    )
  }
}
