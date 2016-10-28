import {Link} from 'react-router';
import React, {Component} from 'react';

export default class TabMenu extends Component {

  render() {
    let tabs = this.props.tabs;
    return (
      <div className="tab-container">
          <ul>
            {tabs.map((tab, i) =>
              <li key={i}><Link key={i} to={tab.link} onlyActiveOnIndex activeClassName="active">{tab.key}</Link></li>
            )}
          </ul>
          <div className="underscore"></div>
        </div>
    );
  }
}



