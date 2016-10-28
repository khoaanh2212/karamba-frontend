import React, {Component} from 'react';
import EasyButton from './EasyButton.component';
import {Link} from 'react-router';

export default class EasyTitle extends Component {

  render() {
    let title = this.props.title;
    let button = this.props.button ?  <Link to={this.props.button.href} style={{textDecoration: 'none'}}><EasyButton position={this.props.button.position} label={this.props.button.label}/></Link> : "";
    return (
      <div className="easy-title">
        <div className="easy-left-element">
          {title}
        </div>
        <div className="easy-right-element">
          {button}
        </div>
      </div>
    );
  }
}



