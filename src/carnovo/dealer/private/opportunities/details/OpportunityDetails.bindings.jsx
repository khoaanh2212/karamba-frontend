import {fetchOpportunity} from 'services/Opportunity.service';
import {OpportunitiesDomain, VERIFY_OFFER} from '../Opportunities.reducer';

let verifyOffer = () => ({type: VERIFY_OFFER, domain: OpportunitiesDomain});

export const OpportunityDetailsStateToPropsBinding = (state) => {
  return {
    token: state.auth.token,
    isVerified: state.opportunities.isVerified
  };
};

export const OpportunityDetailsDispatchToPropsBinding = (dispatch, ownProps) => ({
  fetchOpportunity: (token, opportunityId) => fetchOpportunity(token, opportunityId)
    .then(dispatch),
  verifyOffer: () => dispatch(verifyOffer())
});
