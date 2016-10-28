import React, {Component} from 'react';
import {connect} from 'react-redux';
import CarConfiguration from './components/CarConfiguration.component';
import ConversationsClient from './components/ConversationsClient.component';
import {ShowroomPropsBinding, ShowroomDispatchBinding} from "./Showroom.bindings";

@connect(ShowroomPropsBinding, ShowroomDispatchBinding)
export default class Showroom extends Component {
    constructor() {
        super();
        this.state = {
            tabActive: 'configurations'
        };
    }

    componentWillMount() {
        this.props.fetchAppliances(this.props.token);
    }

    onClearSession() {
        this.props.clearSession();
    }

    deleteAppliance(applianceId) {
        this.props.deleteAppliance(this.props.token, applianceId);
    }

    activateConversations() {
        this.setState({
            tabActive: 'conversations'
        });
        this.props.fetchConversationListOfClient(this.props.token);
    }

    activateConfigurations() {
        this.setState({
            tabActive: 'configurations'
        });
    }

    render() {
        return (<div id="show-room">
            <div className="header padding under-line">
                <h1 className="">Showroom</h1>
            </div>
            <div className="body">
                <div className="tab container-fluid no-padding under-line">
                    <ul className="list-inline text-center">
                        {this.state.tabActive === 'configurations' ?
                            <li className="active">&nbsp;Configuraciones</li> :
                            <li onClick={::this.activateConfigurations}>&nbsp;Configuraciones</li>}
                        {this.state.tabActive === 'conversations' ?
                            <li className="active">&nbsp;Conversaciones</li> :
                            <li onClick={::this.activateConversations}>&nbsp;Conversaciones</li>}

                    </ul>
                </div>
                {this.state.tabActive === 'configurations' ? <div className="main-body padding">
                    <CarConfiguration appliances={this.props.appliances} clearSession={::this.onClearSession}
                                      deleteAppliance={this.deleteAppliance.bind(this)}/>
                </div> : <ConversationsClient conversations={this.props.conversations} />}
            </div>
        </div>)
    }
}
