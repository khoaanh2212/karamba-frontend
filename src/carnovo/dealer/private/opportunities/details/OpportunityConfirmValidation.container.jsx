import React, {Component} from 'react';
import OpportunitySendOffer from './component/footer/OpportunitySendOffer.component';
import OpportunitySendEmail from './component/footer/OpportunitySendEmail.component';
import CarInStock from './component/CarInStock.component';
import OfferPricePreview from '../../../../widgets/OfferPricePreview.component';
import OfferOptionsPreview from '../../../../widgets/OfferOptionsPreview.component';
import VehicleDetailsBox from '../../../../widgets/VehicleDetailsBox.component';
import OfferDetailsPrice from '../../../../widgets/OfferDetailsPrice.component';
import {NEW} from '../Opportunities.reducer';

let PriceComponent = (price) => {
  return <OfferDetailsPrice price={price}/>;
};

export default class OpportunityConfirmValidation extends Component {

  render() {
    let {opportunity, offer, conditions} = this.props;
    let details = <VehicleDetailsBox car={opportunity.appliance}
                                     PriceComponent={PriceComponent(opportunity.appliance.price)}/>;
    return (
      <div className="grid opportunityDetails opodetail" id="confirm-offer">
        <div id="nav-stock" className="grid">
          <div id="nav-title" className="col-1-2">
            Resumen <span className="separator">/</span> <span>{opportunity.clientName}</span></div>
          <div id="nav-title" className="col-1-2 offerId">ID Oferta {this.props.opportunity.id}</div>
        </div>

        <div className="grid box">
          <div className="col-1-2">
            {details}
          </div>
          <OfferPricePreview pvp={opportunity.appliance.price} cashPrice={offer.cashPrice} financePrice={offer.financePrice}/>
          <CarInStock opportunity={opportunity}></CarInStock>
          <OfferOptionsPreview brand={opportunity.appliance.vehicle.makeNameToDisplay} conditions={conditions}></OfferOptionsPreview>
          {
            opportunity.isNew === NEW ?
              <OpportunitySendOffer onStepBack={this.props.onRevalidate} sendOffer={this.props.sendOffer}></OpportunitySendOffer> :
              <OpportunitySendEmail></OpportunitySendEmail>
          }
        </div>
      </div>
    );
  }
}
