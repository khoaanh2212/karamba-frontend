import React, {Component} from 'react';
import {Link} from 'react-router';

export default class DealerNavBar extends Component {
  render() {
    return (
      <ul className="link-menu">
        <li>
          <Link to={process.env.PUBLIC_PATH + "dealer/opportunities"} activeClassName="active"><i className="ic-bag"/></Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_PATH + "dealer/conversations"} activeClassName="active"><i className="ic-message"/></Link>
        </li>
        <li>
          {/* @ how to create material-icons? */}
          {/*<Link to="/dealer/statistic" activeClassName="active"><i className="material-icons">statistics</i></Link>*/}
          <Link to={process.env.PUBLIC_PATH + "dealer/statistic"} activeClassName="active"><i className="ic-statistics"/></Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_PATH + "dealer/stock"} activeClassName="active"><i className="material-icons">directions_car</i></Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_PATH + "dealer/catalog"} activeClassName="active"><i className="material-icons">find_in_page</i></Link>
        </li>
      </ul>
    )
  }
}
