import React, {Component} from 'react';

export default class EasySubtitle extends Component {

  render() {
    let text = this.props.text;
    return (
      <div className="easy-subtitle">
        <div>{text}</div>
      </div>
    );
  }
}



