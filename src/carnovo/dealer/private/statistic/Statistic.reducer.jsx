import reducerFactory from 'shared/utils/ReducerFactory';

export const FETCH_STATISTIC_SUCCESS = 'FETCH_STATISTIC_SUCCESS';
export const FETCH_STATISTIC_ERROR = 'FETCH_STATISTIC_ERROR';


export const StatisticDomain = 'StatisticDomain';
export const initialState = {
  loaded: false,
  loading: true,
  error: null,
  statistic: {}
};

let cases = (state, action) => {
  switch (action.type) {
    case FETCH_STATISTIC_SUCCESS:
      return {...state, error: null, loading: false, statistic: action.statistic};
    case FETCH_STATISTIC_ERROR:
      return {...state, error: action.error, loading: false, statistic: {}};
  }
};

export default reducerFactory(initialState, StatisticDomain, cases);
