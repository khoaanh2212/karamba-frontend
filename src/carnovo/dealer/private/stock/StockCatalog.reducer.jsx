import reducerFactory from 'shared/utils/ReducerFactory';

export const FETCH_STOCK_SUCCESS = 'FETCH_STOCK_SUCCESS';
export const FETCH_STOCK_ERROR = 'FETCH_STOCK_ERROR';
export const DELETE_CAR_SUCCESS = 'DELETE_CAR_SUCCESS';
export const UNSET_NEW = 'UNSET_NEW';
export const StockCatalogDomain = 'StockCatalogDomain';
export const initialState = {
  loaded: false,
  loading: true,
  error: null,
  stock: []
};

let cases = (state, action) => {
  switch (action.type) {
    case FETCH_STOCK_SUCCESS:
      return {...state, stock: action.stock, loading: false, loaded: true, error: null};
    case FETCH_STOCK_ERROR:
      return {...state, loading: false, error: action.error};
    case UNSET_NEW:
      return {...state, stock: state.stock.map(car => ({...car, isNew: null}))};
    case DELETE_CAR_SUCCESS:
      return {...state, stock: state.stock.filter(v => v.id !== action.carId)}
  }
};

export default reducerFactory(initialState, StockCatalogDomain, cases);
