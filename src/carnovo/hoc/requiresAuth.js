import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

export default function requiresAuth(Component, role) {
  let mapStateToProps = (state) => ({
    logged: (state.auth.token) ? true : false,
    loggedRole: state.auth.role,
    isDealer: (state.auth.dealer !== {})
  });

  @connect(mapStateToProps)
  class AuthenticatedComponent extends React.Component {
    componentDidMount() {
      this.checkAndRedirect();
    }

    componentDidUpdate() {
      this.checkAndRedirect();
    }

    redirect() {
      const {dispatch} = this.props;

      switch (role) {
        case 'dealer':
          dispatch(push('/dealer/login'));
          break;
        case 'client':
          dispatch(push('/client/login'));
      }
    }

    checkAndRedirect() {
      if (!this.props.logged) {
        this.redirect();
      } else if (this.props.loggedRole !== role) {
        this.redirect();
      }
    }

    render() {
      return (
        <div className="authenticated">
          { this.props.logged ? <Component {...this.props} /> : null }
        </div>
      );
    }
  }

  return AuthenticatedComponent;
}
