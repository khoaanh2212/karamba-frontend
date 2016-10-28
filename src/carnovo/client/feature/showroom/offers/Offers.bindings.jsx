import {fetchOffers} from 'services/Offers.service';

export const OffersStateToPropsBinding = (state) => {
  return {
    token: state.auth.token,
    appliance: state.offers.appliance,
    offers: state.offers.offers
  };
};

export const OffersDispatchToPropsBinding = (dispatch, ownProps) => ({
  fetchOffers: (token, offerId) => fetchOffers(token, offerId).then(dispatch)
});
