import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DealerMessageStateToPropsBinding, DealerMessageDispatchToPropsBinding} from "./DealerMessage.bindings";
import VehicleDetailsBox from '../../../widgets/VehicleDetailsBox.component';
import EasyTitle from 'shared/components/EasyComponents/EasyTitle.component'
import DetailFooterOffer from './components/DetailFooterOffer.component';
import MessageBox from '../../../shared/components/MessageBox.component';
import OfferDetailsPrice from '../../../widgets/OfferDetailsPrice.component';

@connect(DealerMessageStateToPropsBinding, DealerMessageDispatchToPropsBinding)
export default class DealerMessage extends Component {
  onSendingMessage(offerId, message, upload) {
    this.props.sendDealerMessage(this.props.token, offerId, message, upload);
  }

  componentWillMount() {
    this.props.fetchOpportunity(this.props.params.offerId);
  }

  render() {
    let PriceComponent = price => <OfferDetailsPrice price={price}/>;
    let FooterDetailsComponent = offer => <DetailFooterOffer offer={offer}/>;

    let details = null;
    if (this.props.offer.appliance) {
      details = <VehicleDetailsBox car={this.props.offer.appliance}
                                   PriceComponent={PriceComponent(this.props.offer.appliance.price)}
                                   footer={FooterDetailsComponent(this.props.offer)}/>;
    }

    let messages = this.props.messages;
    let chatWith = this.props.chatWith;
    return (
      <div>
        <EasyTitle title="Conversaciones"/>
        <div className="opportunityDetails opodetail conversations">
          <div id="nav-stock" className="grid">
            <div id="nav-title" className="col-1-2">{chatWith}</div>
            <div id="nav-title" className="col-1-2 offerId">ID Oferta {this.props.offer.id}</div>
          </div>
          <div className="grid box" id="stock-details">
            <div className="col-1-3">
              {details}
            </div>
            <div className="col-2-3">
              <div id="dealer-message">
                <MessageBox onSendingMessage={this.onSendingMessage.bind(this)} offerId={this.props.params.offerId} messages={messages} chatWith={chatWith} displayTitle={false}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
