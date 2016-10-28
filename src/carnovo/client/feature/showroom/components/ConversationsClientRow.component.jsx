import React, {Component} from 'react';
import PopupCall from './PopupCall.component';
import PopupMessage from './PopupMessage.component';
import Moment from 'moment';
import {browserHistory} from 'react-router';

export default class ConversationsClientRow extends Component {

    constructor() {
        //<button className="btn call" onClick={::this.showPopupCall}> Llamar <i className="ic-phone"/>
        //</button>
        super();
        this.state = {
            showPopup: false,
            popupCall: false,
            popupMessage: false
        };
        Moment.locale('es');
    }

    showPopupCall() {
        this.setState({
            showPopup: true,
            popupCall: true
        });
    }

    showPopupMessage() {
        this.setState({
            popupCall: false,
            popupMessage: true
        });
    }

    hidePopup() {
        this.setState({
            showPopup: false,
            popupCall: false,
            popupMessage: false
        });
    }

    linkToMessage() {
        browserHistory.push('/client/message/' + this.props.conversation.offer_id);
    }

    render() {
        let moment = Moment;
        return (
            <div className="item">
                <div className="details">
                    <div className="big-block">
                        <div className="avatar content-big-block">
                            <div className="avatar-frame img-circle"
                                 style={{backgroundImage: "url('" + this.props.conversation.dealer_avatar + "'"}}>
                            </div>
                        </div>
                        <div className="content-info content-big-block">
                            <div className="name">{this.props.conversation.dealer_name}</div>
                            <div className="info col-xs-12 no-padding">
                                <div className="block-info col-md-4 col-xs-12 no-padding">
                                    <span className="font-weight-light">{this.props.conversation.dealer_address}</span>
                                </div>
                                <div className="block-info col-md-4 col-xs-12 no-padding">
                                    <span className="title-bold">Oferta:&nbsp;</span>
                                    <span className="font-weight-light">{this.props.conversation.model}</span>
                                </div>
                                <div className="block-info col-md-4 col-xs-12 no-padding">
                                    <span className="title-bold">Último contacto:&nbsp;</span>
                                    <span
                                        className="font-weight-light">{moment(this.props.conversation.last_message).from(this.props.conversation.now)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="small-block">
                        <div className="phone"><i className="ic-phone"></i><span>0</span></div>
                        <div className="email"><i
                            className="ic-email"></i><span>{this.props.conversation.number_message}</span></div>
                    </div>

                </div>

                <div className="btn-wrapper">
                    <button className="btn call" onClick={::this.showPopupCall}> Llamar <i className="ic-phone"/>
                    </button>
                    <button className="btn message" onClick={::this.linkToMessage}>
                        Enviar mensaje <i className="ic-email"/></button>
                    <button className="btn to-detail" onClick={(e) => browserHistory.push(process.env.PUBLIC_PATH + 'client/offer/' + this.props.conversation.offer_id + '/dealer/')}> Ver detalles</button>
                </div>
                {this.state.showPopup ? <div className="fade" onClick={::this.hidePopup}></div> : ""}
                {this.state.popupCall && this.state.showPopup ?
                    <PopupCall hidePopupCall={::this.hidePopup} showPopupMessage={::this.showPopupMessage}/> : ""}
                {this.state.popupMessage && this.state.showPopup ?
                    <PopupMessage hidePopupMessage={::this.hidePopup}/> : ""}
            </div>
        );
    }
}