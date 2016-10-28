import 'whatwg-fetch';
import config from 'config';
import {checkStatus, getOptions} from './Utils';

import {
  OffersDomain,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_ERROR
} from "client/feature/showroom/offers/Offers.reducer";

function fetchOffersSuccess(response) {
  return {
    type: FETCH_OFFERS_SUCCESS,
    domain: OffersDomain,
    appliance: response.data.appliance,
    offers: response.data.offers
  };
}

function  fetchOffersError(error) {
  return {
    type: FETCH_OFFERS_ERROR,
    domain: OffersDomain,
    error: error
  };
}

export function fetchOffers(token, id) {
  var url = config.api + '/client/appliances/' + id + '/offers';

  return fetch(url, getOptions(token))
    .then(data => checkStatus(data, fetchOffersSuccess, fetchOffersError));
}
