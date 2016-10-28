import 'whatwg-fetch';
import config from 'config';
import {checkStatus, getOptions} from './Utils';

import {
  OpportunitiesDomain,
  MAKE_OFFER_SUCCESS,
  MAKE_OFFER_ERROR,
  FETCH_OFFER_SUCCESS,
  FETCH_OFFER_ERROR
} from "dealer/private/opportunities/Opportunities.reducer";

function makeOfferSuccess(opportunityId) {
  return {
    type: MAKE_OFFER_SUCCESS,
    domain: OpportunitiesDomain,
    opportunityId
  }
}

function makeOfferError(error) {
  return {
    type: MAKE_OFFER_ERROR,
    error: error
  }
}

export function makeOffer(token, opportunityId, offer) {
  let offerValues = {
    cashPrize: offer.cashPrice,
    foundedPrize: offer.financePrice,
    inStock: offer.stock,
    message: offer.message
  };

  let options = {
    credentials: 'include',
    method: 'POST',
    headers: {
      'X-TOKEN': token
    },
    body: JSON.stringify(offerValues)
  };

  let makeSuccess = () => makeOfferSuccess(opportunityId);

  return fetch(config.api + '/dealers/offer/' + opportunityId, options)
    .then(data => checkStatus(data, makeSuccess, makeOfferError))
}
