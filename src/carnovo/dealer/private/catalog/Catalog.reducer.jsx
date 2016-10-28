import reducerFactory from 'shared/utils/ReducerFactory';

export const FETCH_CATALOG_SUCCESS = 'FETCH_CATALOG_SUCCESS';
export const FETCH_CATALOG_ERROR = 'FETCH_CATALOG_ERROR';
export const SAVE_CATALOG_SUCCESS = 'SAVE_CATALOG_SUCCESS';
export const SAVE_CATALOG_ERROR = 'SAVE_CATALOG_ERROR';
export const CatalogDomain = 'CatalogDomain';
export const initialState = {
  error: null,
  catalog: {}
};

let cases = (state, action) => {
  switch(action.type) {
    case FETCH_CATALOG_SUCCESS:
      return {...state, catalog: action.catalog, error: null};
    case SAVE_CATALOG_SUCCESS:
      return {...state, error: null};
    case FETCH_CATALOG_ERROR:
      return {...state, catalog: {}, error: action.error};
    case SAVE_CATALOG_ERROR:
      return {...state, catalog: {}, error: action.error};
  }
};

export default reducerFactory(initialState, CatalogDomain, cases);
