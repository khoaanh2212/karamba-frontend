import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ClientMessageStateToPropsBinding, ClientMessageDispatchToPropsBinding} from "./ClientMessage.bindings";
import MessageBox from '../../../shared/components/MessageBox.component';

@connect(ClientMessageStateToPropsBinding, ClientMessageDispatchToPropsBinding)
export default class ClientMessage extends Component {
    onSendingMessage(offerId, message, upload) {
      this.props.sendClientMessage(this.props.token, offerId, message, upload);
    }

    render() {
        let messages = this.props.messages;
        let chatWith = this.props.chatWith;

        return (
            <div id="client-message">
                <MessageBox onSendingMessage={this.onSendingMessage.bind(this)} offerId={this.props.params.offerId} messages={messages} chatWith={chatWith}/>
            </div>
        )
    }
}
