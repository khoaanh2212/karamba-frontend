import 'whatwg-fetch';
import config from 'config';
import {checkStatus, getOptions} from './Utils';

import {
  StatisticDomain,
  FETCH_STATISTIC_SUCCESS,
  FETCH_STATISTIC_ERROR
} from "dealer/private/statistic/Statistic.reducer";

function fetchStatisticSuccess(response) {
  return {
    type: FETCH_STATISTIC_SUCCESS,
    domain: StatisticDomain,
    statistic: response.data.statistic
  };
}

function  fetchStatisticError(error) {
  return {
    type: FETCH_STATISTIC_ERROR,
    domain: StatisticDomain,
    error: error
  };
}

export function fetchStatistic(token) {
  var url = config.api + '/dealer/statistic';

  return fetch(url, getOptions(token))
    .then(data => checkStatus(data, fetchStatisticSuccess, fetchStatisticError));
}
