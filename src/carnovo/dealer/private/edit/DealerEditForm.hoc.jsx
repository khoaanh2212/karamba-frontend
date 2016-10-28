import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import ui from 'redux-ui';
import {fetchCurrentDealer} from 'services/Dealer.service'
import DealerConfirmUi from './DealerEditForm.uistate';
import ErrorBox from 'shared/components/ErrorBox.component';

export default function CurrentDealer(Component) {
  let mapStateToPros = (state) => ({
    token: state.auth.token
  });

  let mapDispatchToProps = (dispatch, ownProps) => ({
    fetchDealer: (token) => {
      fetchCurrentDealer(token)
        .then(dispatch)
    }
  });

  @ui(DealerConfirmUi)
  @connect(mapStateToPros, mapDispatchToProps)
  class DealerComponent extends React.Component {
    componentWillMount() {
      this.props.fetchDealer(this.props.token);
    }

    render() {
      if (this.props.ui.loading) {
        return <span>Loading...</span>;
      } else if (this.props.ui.error !== null) {
        return <ErrorBox message={this.props.ui.error}/>
      } else {
        return (
          <Component {...this.props}
            profile={this.props.ui.profile.toJS()}
            conditions={this.props.ui.conditions.toJS()}/>
        )
      }
    }
  }

  return DealerComponent;
}
