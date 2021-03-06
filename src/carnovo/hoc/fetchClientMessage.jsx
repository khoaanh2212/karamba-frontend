import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchClientMessage} from 'services/ClientMessage.service';
import ErrorBox from 'shared/components/ErrorBox.component';

export default function fetchMessage(Component) {

  let mapStateToProps = (state) => ({
    token: state.auth.token,
    messages: state.clientMessage.messages
  });

  let DispatchToPropsBinding = (dispatch, ownProps) => ({
    getMessage: (token) => fetchClientMessage(token, ownProps.params.offerId).then(dispatch)
  });

  @connect(mapStateToProps, DispatchToPropsBinding)
  class FetchMessage extends React.Component {
    componentDidMount() {
      if(!this.props.messages.loaded) this.props.getMessage(this.props.token);
    }

    render() {
      if (this.props.messages.loading === true) {
        return <div>Loading...</div>
      } else if (this.props.messages.error) {
        return <ErrorBox message={this.props.messages.error}/>
      } else {
        return <Component {...this.props} messages={this.props.messages} />
      }
    }
  }

  return FetchMessage
}
