import {authDomain, CLEAR_SESSION, HIDE_POPUP} from '../auth/Login.reducer';
import {CarRegisterDomain} from '../client/car-register/RegisterCar.reducer';

let clearSession = () => ({type: CLEAR_SESSION, domain: CarRegisterDomain});

export const AppPropsBindings = (state) => ({
  isLogged: state.auth.token ? true : false,
  role: state.auth.role,
  isHidden: state.auth.hidePopup,
  notifications: state.notifications
});

export function AppDispatchBinding(dispatch) {
  return {
    clearSession: () => dispatch(clearSession()),
    onHidePopup: () => { dispatch({type: HIDE_POPUP, domain: authDomain}) }
  }
}
