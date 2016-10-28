import {push} from 'react-router-redux';
import {CLEAR_SESSION} from '../auth/Login.reducer';
import {CarRegisterDomain} from '../client/car-register/RegisterCar.reducer';
import {
  CREATE_CLIENT_SUCCESS,
  CREATE_CAR_APPLIANCE_SUCCESS
} from "../client/Client.reducer";

let clearSession = () => ({type: CLEAR_SESSION, domain: CarRegisterDomain});

export default store => next => action => {
  let nextAction = next(action);

  switch (action.type) {
    case CREATE_CLIENT_SUCCESS:
    case CREATE_CAR_APPLIANCE_SUCCESS:
      store.dispatch(clearSession());
      store.dispatch(push('/client/showroom'));
      break;
  }

  return nextAction;
}
