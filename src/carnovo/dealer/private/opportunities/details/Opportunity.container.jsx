import React, {Component} from 'react';
import {connect} from 'react-redux';
import OpportunityDetails from './OpportunityDetails.container';
import OpportunityConfirmValidation from './OpportunityConfirmValidation.container';
import {OpportunityMakeOfferStateToProps, OpportunityMakeOfferDispatchToProps} from './OpportunityMakeOffer.bindings';

@connect(OpportunityMakeOfferStateToProps, OpportunityMakeOfferDispatchToProps)
export default class Opportunity extends Component {
  state = {
    offer: null,
    isValidated: false
  };

  componentWillMount() {
    this.props.unverifyOffer();
  }

  validateOffer(offer) {
    if (!offer.cashPrice || !offer.message) {
      return;
    }
    this.setState({
      offer: offer,
      isValidated: true
    });
    this.props.commitOffer(offer);
    window.scrollTo(0,0);
  }

  onRevalidate() {
    this.setState({ isValidated: false });
  }

  sendOffer() {
    this.props.makeOffer(this.props.token, this.state.offer);
  }

  render() {
    let opportunity = this.props.opportunities.selectedOpportunity;
    let makingOffer = this.props.makingOffer;

    return (
      <div>
        {this.state.offer == null || !this.state.isValidated?
          <OpportunityDetails
            isVerified = {!!this.state.offer}
            opportunities={this.props.opportunities}
            opportunity={opportunity}
            makingOffer={makingOffer}
            opportunityId={this.props.params.opportunityId}
            validateOffer={::this.validateOffer}/>
          :
          <OpportunityConfirmValidation
            conditions={this.props.profile.generalConditions}
            opportunity={opportunity}
            offer={this.state.offer}
            onRevalidate={::this.onRevalidate}
            isValidated={this.state.isValidated}
            sendOffer={::this.sendOffer}/>
        }
      </div>
    );
  }
}
