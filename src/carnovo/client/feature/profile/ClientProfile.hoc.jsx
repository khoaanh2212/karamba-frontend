import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {fetchCurrentClient} from 'services/Client.service'
import ErrorBox from '../../../shared/components/ErrorBox.component';

export default function CurrentClient(Component) {
  let mapStateToPros = (state) => ({
    token: state.auth.token,
    profile: state.client.profile
  });

  let mapDispatchToProps = (dispatch, ownProps) => ({
    fetchClient: (token) => { fetchCurrentClient(token).then(dispatch) }
  });

  @connect(mapStateToPros, mapDispatchToProps)
  class ClientComponent extends React.Component {
    componentWillMount() {
      this.props.fetchClient(this.props.token);
    }

    render() {
      if (this.props.loading === true) {
        return <div>Loading ...</div>
      } else if (this.props.error) {
        return <ErrorBox message={this.props.error}/>
      }else {
        return (
          <Component {...this.props} />
        )
      }
    }
  }

  return ClientComponent;
}
