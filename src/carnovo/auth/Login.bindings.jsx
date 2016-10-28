import {dealerLogin} from "services/DealerLogin.service";
import {authDomain, REMOVE_ERROR} from './Login.reducer'

export function LoginPropsBindings(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export function LoginDispatchBindings(dispatch) {
  return {
    onSubmit: (username, password) => {
      dealerLogin(username, password)
        .then(dispatch);
    },
    removeErrors: () => {
      dispatch({type: REMOVE_ERROR, domain: authDomain})
    }
  }
}
