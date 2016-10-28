import {fetchDealerOfferDetails} from '../../../../../services/DealerOffer.service';
import {DealerOfferDetailsDomain, ON_LOAD_MORE_REVIEW_LIST} from './DealerOfferDetails.reducer';
import {fetchClientMessage} from 'services/ClientMessage.service';

let loadMore = () => ({type: ON_LOAD_MORE_REVIEW_LIST, domain: DealerOfferDetailsDomain});

export const DealerOfferDetailToPropsBinding = (state) => {
  return {
    token: state.auth.token,
    role: state.auth.role,
    profile: state.dealerOfferDetails.profile,
    offers: state.dealerOfferDetails.offers,
    reviews: state.dealerOfferDetails.reviews,
    hasMore: (state.dealerOfferDetails.pageLength + 5 <= state.dealerOfferDetails.allComments.length),
    messages: state.clientMessage.messages
  }
};

export const DealerOfferDetailDispatchToPropsBinding = (dispatch, ownProps) => ({
  fetchDealerOfferDetails: (token, offerId) => {
    fetchDealerOfferDetails(token, offerId).then(dispatch);
    fetchClientMessage(token, offerId).then(dispatch);
  },
  loadmoreReviewList: () => dispatch(loadMore())
});
