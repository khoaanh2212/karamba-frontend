import reducerFactory from 'shared/utils/ReducerFactory';

export const FETCH_BRANDS_SUCCESS = 'FETCH_BRANDS_SUCCESS';
export const FETCH_BRANDS_ERROR = 'FETCH_BRANDS_ERROR';
export const FETCH_MODELS_SUCCESS = 'FETCH_MODELS_SUCCESS';
export const FETCH_MODELS_ERROR = 'FETCH_MODELS_ERROR';
export const FETCHING_MODELS_BRAND = 'FETCHING_MODELS_BRAND';

export const CarsDomain = 'CarsDomain';
export const initialState = {
  loading: true,
  error: null,
  brands: [],
  models: {}
};

let addModelsForBrand = (state, brand, models) => {
  let successModel = {};
  successModel[brand] = {
    error: null,
    models: models
  };
  return {...state, error: null, loading: false, models: {...state.models, ...successModel}}
};

let modelsFetchErrorForBrand = (state, brand, error) => {
  let errorModel = {};
  errorModel[brand] = {
    error: error,
    models: []
  };

  return {...state, error: null, loading: false, models: {...state.models, ...errorModel}}
};

let cases = (state, action) => {
  switch (action.type) {
    case FETCH_BRANDS_SUCCESS:
      return {...state, error: null, loading: false, brands: action.brands};
    case FETCH_BRANDS_ERROR:
      return {...state, error: action.error, loading: false, brands: []};
    case FETCH_MODELS_SUCCESS:
      return addModelsForBrand(state, action.brand, action.models);
    case FETCH_MODELS_ERROR:
      return modelsFetchErrorForBrand(state, action.brand, action.error);
    case FETCHING_MODELS_BRAND:
      return addModelsForBrand(state, action.brand, []);
  }
};

export default reducerFactory(initialState, CarsDomain, cases);
