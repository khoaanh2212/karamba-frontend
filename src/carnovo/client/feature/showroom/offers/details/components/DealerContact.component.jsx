import React, {Component} from 'react';
import {browserHistory} from 'react-router'
export default class DealerContact extends Component {

    render() {
        return (
            <div className="top">
                <div className="col-xs-1"></div>
                <div className="col-xs-10">
                    <div className="left">
            <div onClick={::this.props.showPopupCall} className="img-circle call-icon">
              <i className="ic-phone"></i>
            </div>
            <div className="call-number">
              <div>Llama a {this.props.profile.vendorName} al 934 295 298.</div>
              <div>Tu ID de oferta es 16/92390.</div>
            </div>
                    </div>
                    <div className="right">
                        <button className="btn message" onClick={(e) => {
                browserHistory.push(process.env.PUBLIC_PATH + 'client/message/' + this.props.offerId);
            }}> Enviar mensaje <i className="ic-email"/></button>
                    </div>
                </div>
                <div className="col-xs-1"></div>
            </div>
        )
    }
}
