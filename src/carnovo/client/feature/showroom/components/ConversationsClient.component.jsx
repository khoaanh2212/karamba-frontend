import React, {Component} from 'react';
import ConversationsClientRow from './ConversationsClientRow.component';
import ConversationsClientIntroduce from './ConversationsClientIntroduce.component';

export default class ConversationsClient extends Component {

    render() {
        let conversations = this.props.conversations;
        return (
            <div className="conversations" id="list_conversation">
                <div className="conversation-list">
                    <div className="items">
                        {conversations.map((conversation, index) => {
                            return <ConversationsClientRow key={index} conversation={conversation}/>
                        })}
                        <ConversationsClientIntroduce />
                    </div>
                </div>
            </div>
        );
    }
}