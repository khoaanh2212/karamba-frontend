import {deleteCar} from 'services/Car.service';
import {push} from 'react-router-redux';
import {UNSET_NEW, StockCatalogDomain} from '../StockCatalog.reducer';

export const StockDetailsStateToPropsBinding = (state) => {
  return {
    token: state.auth.token,
    car: (id) => {
      let car = state.stock.stock.filter(car => car.id === id)[0];
      let index = state.stock.stock.indexOf(car);
      return {...car,
        previousId: index>0 ? state.stock.stock[index-1].id : null,
        nextId: index<state.stock.stock.length-1 ? state.stock.stock[index+1].id : null};
    }
  };
};

export const StockDetailsDispatchToPropsBinding = (dispatch, ownProps) => ({
  deleteCar: (token, carId) => deleteCar(token, carId)
    .then(dispatch)
    .then(dispatch(push('/dealer/stock'))),
  unsetNew: () => dispatch({type: UNSET_NEW, domain: StockCatalogDomain})
});
