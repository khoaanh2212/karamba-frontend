import {push} from 'react-router-redux';
import {StockCatalogDomain, FETCH_STOCK_SUCCESS} from 'dealer/private/stock/StockCatalog.reducer';
import {FETCH_EXTRAS_SUCCESS} from 'dealer/private/car-form/CarForm.reducer';

export default store => next => action => {
  let nextAction = next(action);

  switch (action.type) {
    case 'SAVE_CAR_SUCCES':
      store.dispatch({
        type: FETCH_STOCK_SUCCESS,
        domain: StockCatalogDomain,
        stock: action.stock
      });
      store.dispatch(push('/dealer/stock'));
      break;
    case FETCH_EXTRAS_SUCCESS:
      store.dispatch({
        type: 'REGISTER_RELOAD_EXTRAS',
        domain: 'CarRegisterDomain'
      });
      break;
  }

  return nextAction;
}
