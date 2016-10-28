import {combineReducers}  from 'redux';
import {routerReducer}  from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {reducer as uiReducer} from 'redux-ui';
import {reducer as notifications} from 'react-notification-system-redux';

import dealerPassword from 'confirm/dealer/ValidateDealer.reducer.jsx';
import auth from 'auth/Login.reducer';
import cars from 'hoc/cars.reducer';
import carModel from 'dealer/private/car-form/CarForm.reducer';
import catalog from 'dealer/private/catalog/Catalog.reducer';
import stock from 'dealer/private/stock/StockCatalog.reducer';
import opportunities from 'dealer/private/opportunities/Opportunities.reducer';
import carRegister from 'client/car-register/RegisterCar.reducer';
import client from 'client/Client.reducer';
import statistic from 'dealer/private/statistic/Statistic.reducer';
import offers from 'client/feature/showroom/offers/Offers.reducer';
import dealerOfferDetails from 'client/feature/showroom/offers/details/DealerOfferDetails.reducer';
import clientMessage from 'client/feature/message/ClientMessage.reducer';
import dealerMessage from 'dealer/private/message/DealerMessage.reducer';
import notificationStatus from 'notification/Notification.reducer';
import conversations from 'dealer/private/conversations/Conversations.reducer';
import clientReview from 'client/feature/review/ClientReview.reducer';
import dealerProfile from 'dealer/private/profile/DealerProfile.reducer';

export default combineReducers({
  dealerPassword,
  auth,
  cars,
  carModel,
  carRegister,
  client,
  offers,
  dealerOfferDetails,
  clientMessage,
  clientReview,
  catalog,
  stock,
  statistic,
  opportunities,
  conversations,
  routing: routerReducer,
  form: formReducer,
  ui: uiReducer,
  notifications,
  dealerMessage,
  notificationStatus,
  dealerProfile
});
