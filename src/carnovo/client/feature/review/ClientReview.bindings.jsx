import {fetchReviewDealersList, fetchReviewGifts, sendReview} from '../../../services/ClientReview.service';

export const ClientReviewToPropsBinding = (state, ownProps) => {
  return {
    token: state.auth.token,
    dealers: state.clientReview.dealers,
    gifts: state.clientReview.gifts
  };
};

export const ClientReviewDispatchToPropsBinding = (dispatch, ownProps) => ({
  fetchDealersList: (token) => fetchReviewDealersList(token, ownProps.location.query.id).then(dispatch),
  fetchGifts: (token) => fetchReviewGifts(token).then(dispatch),
  sendReview: (token, body) => sendReview(token, body).then(dispatch)
});
