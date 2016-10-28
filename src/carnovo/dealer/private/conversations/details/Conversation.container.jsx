import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ConversationStateToPropsBinding, ConversationDispatchToPropsBinding} from './Conversation.bindings';
import OfferDetail from './component/OfferDetail.component';
import Messages from './component/Messages.component';

@connect(ConversationStateToPropsBinding, ConversationDispatchToPropsBinding)
export default class Conversation extends Component {
  state = {

  };

  componentWillMount() {
    this.props.fetchMessage(this.props.token);
    this.props.fetchOpportunity(this.props.token);
  }

  render() {
    let messages = this.props.messages;
    let offer = this.props.offer;

    return(
      <div className="conversation">
        <div className="col-md-6">
          <div className="info">
            {offer.clientName}
          </div>
          <OfferDetail {...offer}/>
        </div>
        <div className="col-md-6">
          <Messages sendDealerMessage={this.props.sendDealerMessage} offerId={offer.id} {...messages}/>
        </div>
      </div>
    )
  }
}
