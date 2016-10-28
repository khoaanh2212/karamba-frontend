import React, {Component} from 'react'

export default class RegisterHeader extends Component {

  getHeader() {
    return { __html: this.props.header };
  }

  getSubHeader() {
    return { __html: this.props.subHeader };
  }

  render() {
    return (
      <div className="heading text-center">
        <h1 dangerouslySetInnerHTML={this.getHeader()}></h1>
        <p dangerouslySetInnerHTML={this.getSubHeader()}></p>
      </div>
    );
  }
}
