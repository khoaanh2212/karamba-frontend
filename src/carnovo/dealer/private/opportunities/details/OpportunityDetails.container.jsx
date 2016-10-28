import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  OpportunityDetailsStateToPropsBinding,
  OpportunityDetailsDispatchToPropsBinding
} from './OpportunityDetails.bindings';
import {browserHistory} from 'react-router';
import UserDetails from './component/OpportunityUserDetails.component';
import EasyButton from 'shared/components/EasyComponents/EasyButton.component';
import OpportunityValidateOffer from './component/OpportunityValidateOffer.component';
import CarInStock from './component/CarInStock.component';
import VehicleDetailsBox from '../../../../widgets/VehicleDetailsBox.component';
import OfferDetailsPrice from '../../../../widgets/OfferDetailsPrice.component';

let PriceComponent = (price) => {
  return <OfferDetailsPrice price={price}/>;
};

@connect(OpportunityDetailsStateToPropsBinding, OpportunityDetailsDispatchToPropsBinding)
export default class OpportunityDetails extends Component {
  componentWillMount() {
    this.props.fetchOpportunity(this.props.token, this.props.opportunityId)
  }

  navigateTo = (path) => {
    browserHistory.push(process.env.PUBLIC_PATH + path);
  }

  onVerify() {
    this.props.verifyOffer();
  }

  onBack() {
    browserHistory.goBack();
  }

  render() {
    let details = null;
    if (this.props.opportunity.appliance) {
      details = <VehicleDetailsBox car={this.props.opportunity.appliance}
                                   PriceComponent={PriceComponent(this.props.opportunity.appliance.price)}/>;
    }
    return (
      <div className="grid opportunityDetails opodetail" id="stock-details">
        <div id="nav-stock" className="grid">
          <div id="nav-title" className="col-1-2">Resumen</div>
          <div id="nav-title" className="col-1-2 offerId">ID Oferta {this.props.opportunity.id}</div>
        </div>
        <div className="grid box">
          <div className="col-1-2 preview">
            <UserDetails user={this.props.opportunity}/>
          </div>
          <div className="col-1-2">
            {details}
          </div>
          <CarInStock opportunity={this.props.opportunity}></CarInStock>
          <div className="grid footer offerButtonDiv">
            {this.props.isVerified === false ?
              <div>
                <EasyButton position="right" label="Realizar oferta" onSubmit={() => {::this.onVerify()}}/>
                <EasyButton position="left" label="Atrás" onSubmit={::this.onBack} />
              </div>
              : <OpportunityValidateOffer makingOffer={this.props.makingOffer} instock={this.props.opportunity.isStock} pvp={this.props.opportunity.appliance.price} recommendedPrice={this.props.opportunity.appliance.price}
                                          validateOffer={this.props.validateOffer}/> }
          </div>
        </div>
      </div>
    );
  }
}
