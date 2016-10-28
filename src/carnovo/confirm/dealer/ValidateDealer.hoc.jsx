import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from "./ValidateDealer.bindings";
import ErrorBox from 'shared/components/ErrorBox.component';

export default function ValidateDealerForm(Component) {
  @connect(mapStateToProps, mapDispatchToProps)
  class TokenContextValidation extends React.Component {
    componentDidMount() {
      this.props.onLoadComponent();
    }

    render() {
      if (this.props.dealerPassword.loading) {
        return <span>Loading...</span>;
      } else if (this.props.dealerPassword.error !== null) {
        return <ErrorBox message={this.props.dealerPassword.error}/>
      } else {
        return <Component routeToken={this.props.routeParams.token}
                          dealerApplication={this.props.dealerPassword.dealerPassword}/>;
      }
    }
  }

  return TokenContextValidation;
}
