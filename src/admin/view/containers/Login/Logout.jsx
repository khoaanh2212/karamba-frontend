import React from 'react';
import {connect} from 'react-redux';
import {LogoutDispatchBindings} from './LogoutBindings';

@connect(null, LogoutDispatchBindings)
export default class AdminLogout extends React.Component {
  componentWillMount() {
    this.props.clearSession();
  }

  render() {
    return (<div></div>);
  }
}
