import {makeOffer} from 'services/Offer.service';
import {OpportunitiesDomain, UNVERIFY_OFFER, COMMIT_OFFER} from '../Opportunities.reducer';

let unverifyOffer = () => ({type: UNVERIFY_OFFER, domain: OpportunitiesDomain});
let commitOffer = (offer) => ({makingOffer: offer, type: COMMIT_OFFER, domain: OpportunitiesDomain});

export const OpportunityMakeOfferStateToProps = (state, ownProps) => {
  return {
    token: state.auth.token,
    makingOffer: state.opportunities.makingOffer
  };
};

export const OpportunityMakeOfferDispatchToProps = (dispatch, ownProps) => ({
  makeOffer: (token, offer) => makeOffer(token, ownProps.params.opportunityId, offer).then(dispatch),
  commitOffer: (offer) => dispatch(commitOffer(offer)),
  unverifyOffer: () => dispatch(unverifyOffer())
});
