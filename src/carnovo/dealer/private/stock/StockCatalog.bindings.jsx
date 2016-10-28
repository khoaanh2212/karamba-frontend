import {fetchStock, deleteCar} from 'services/Car.service';
import orderBy from 'lodash/orderBy';
import {
    STOCK_FINISH_UPDATE_NOTIFICATION_OFF,
    NotificationStatusDomain
} from '../../../notification/Notification.reducer';
let clearNotificationAfterUpdated = (status) => ({
  type: STOCK_FINISH_UPDATE_NOTIFICATION_OFF,
  domain: NotificationStatusDomain,
  status
});

export const StockCatalogStateToPropsBinding = (state) => {
  return {
    token: state.auth.token,
    newCar: state.stock.stock.filter(car => car.isNew === true).length > 0,
    stock: (brand, sort) => {
      let stock = (brand === '') ? state.stock.stock : state.stock.stock.filter(car => car.vehicle.makeNameToDisplay === brand);
      if (sort.field !== '') {
        return orderBy(stock, sort.identity, sort.order ? 'asc' : 'desc');
      } else {
        return orderBy(stock, 'isNew', 'desc');
      }
    },
    notificationStatus: state.notificationStatus.justUpdateStock
  };
};

export const StockCatalogDispatchToPropsBinding = (dispatch, ownProps) => ({
  toast: notification => dispatch(notification),
  deleteCar: (token, carId) => deleteCar(token, carId).then(dispatch),
  offNotification: (status) => dispatch(clearNotificationAfterUpdated(status))
});
