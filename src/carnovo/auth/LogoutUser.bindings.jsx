import {CLEAR_SESSION, authDomain} from 'auth/Login.reducer';
import {CarRegisterDomain} from '../client/car-register/RegisterCar.reducer';

let clearAuth = () => ({type: CLEAR_SESSION, domain: authDomain});
let clearCarRegister = () => ({type: CLEAR_SESSION, domain: CarRegisterDomain});

export function LogoutPropsBingding(state, ownProps) {
    return {};
}

export function LogoutDispatchBingding(dispatch) {
    return {
      clearSession: () => {
        dispatch(clearAuth());
        dispatch(clearCarRegister());
      }
    }
}
