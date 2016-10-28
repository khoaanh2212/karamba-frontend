import 'whatwg-fetch';
import config from 'config';
import {checkStatus, getOptions} from './Utils';

import {
  DealerOfferDetailsDomain,
  FETCH_DEALER_OFFER_DETAILS_SUCCESS,
  FETCH_DEALER_OFFER_DETAILS_ERROR,
  ON_LOAD_MORE_REVIEW_LIST
} from "../client/feature/showroom/offers/details/DealerOfferDetails.reducer";

function fetchDealerOfferDetailSuccess(response) {
  return {
    type: FETCH_DEALER_OFFER_DETAILS_SUCCESS,
    domain: DealerOfferDetailsDomain,
    profile: response.data.dealer.profile,
    offers: response.data.offers,
    reviews: response.data.reviews
  }
}

function fetchDealerOfferDetailError(error) {
  return {
    type: FETCH_DEALER_OFFER_DETAILS_ERROR,
    error: error
  }
}

export function fetchDealerOfferDetails(token, offerId) {
  var url = config.api + '/client/offer/' + offerId + '/dealer';

  return fetch(url, getOptions(token))
      .then(data => checkStatus(data, fetchDealerOfferDetailSuccess, fetchDealerOfferDetailError));
}
