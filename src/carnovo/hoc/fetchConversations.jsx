import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchConversations} from 'services/Conversations.service';
import ErrorBox from 'shared/components/ErrorBox.component';

export default function fetchDealerConversations(Component) {
  let mapStateToProps = (state) => ({
    token: state.auth.token,
    conversations: state.conversations
  });

  let DispatchToPropsBinding = (dispatch, ownProps) => ({
    getConversations: token => fetchConversations(token).then(dispatch)
  });

  @connect(mapStateToProps, DispatchToPropsBinding)
  class FetchConversations extends React.Component {
    componentDidMount() {
      if(!this.props.conversations.loaded) this.props.getConversations(this.props.token);
    }

    render() {
      if (this.props.conversations.loading === true) {
        return <div>Loading...</div>
      } else if (this.props.conversations.error) {
        return <ErrorBox message={this.props.conversations.error}/>
      } else {
        return <Component {...this.props} conversations={this.props.conversations} />
      }
    }
  }

  return FetchConversations;
}
