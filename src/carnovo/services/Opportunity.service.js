import 'whatwg-fetch';
import config from 'config';
import {checkStatus, getOptions, postOptions} from './Utils';

import {
  OpportunitiesDomain,
  FETCH_OPPORTUNITIES_SUCCESS,
  FETCH_OPPORTUNITIES_ERROR,
  FETCH_OPPORTUNITY_SUCCESS,
  FETCH_OPPORTUNITY_ERROR,
  FETCH_OPPORTUNITY_ARCHIVED_SUCCESS,
  FETCH_OPPORTUNITY_ARCHIVED_ERROR
} from "dealer/private/opportunities/Opportunities.reducer";

function fetchOpportunitiesSuccess(response) {
  return {
    type: FETCH_OPPORTUNITIES_SUCCESS,
    domain: OpportunitiesDomain,
    opportunities: response.data.opportunities
  };
}

function fetchOpportunitiesError(error) {
  return {
    type: FETCH_OPPORTUNITIES_ERROR,
    domain: OpportunitiesDomain,
    error: error
  };
}

function fetchOpportunitySuccess(response) {
  return {
    type: FETCH_OPPORTUNITY_SUCCESS,
    domain: OpportunitiesDomain,
    opportunity: response.data
  };
}

function fetchOpportunityError(error) {
  return {
    type: FETCH_OPPORTUNITY_ERROR,
    domain: OpportunitiesDomain,
    error: error
  };
}

function fetchOpportunitiesArchivedSuccess(response) {
    return {
        type: FETCH_OPPORTUNITY_ARCHIVED_SUCCESS,
        domain: OpportunitiesDomain,
        opportunities: response.data.archived
    }
}

function fetchOpportunitiesArchivedError(error) {
    return {
        type: FETCH_OPPORTUNITY_ARCHIVED_ERROR,
        domain: OpportunitiesDomain,
        error: error
    }
}

export function fetchOpportunities(token) {
  var url = config.api + '/dealers/offers';

  return fetch(url, getOptions(token))
    .then(data => checkStatus(data, fetchOpportunitiesSuccess, fetchOpportunitiesError));
}

export function fetchOpportunity(token, id) {
  var url = config.api + '/dealers/offer/' + id;

  return fetch(url, getOptions(token))
    .then(data => checkStatus(data, fetchOpportunitySuccess, fetchOpportunityError));
}

export function fetchOpportunitiesArchived(token) {
    var url = config.api + '/dealers/offers/archived';
    return fetch(url, getOptions(token))
        .then(data => checkStatus(data, fetchOpportunitiesArchivedSuccess, fetchOpportunitiesArchivedError));
}
