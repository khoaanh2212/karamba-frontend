import React, {Component} from 'react';

export default class UserCertificate extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {

    return(
      <li className="badge-info">
        <div className="user-info">
          <div className="batch">Business Pro</div>
          <div className="score">497/500</div>
        </div>
      </li>
    )
  }
}
