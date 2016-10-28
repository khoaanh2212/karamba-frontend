import {CLEAR_SESSION, AuthDomain} from '../../../reducers/authReducer';
import {push} from 'react-router-redux';

let clearAuth = () => ({type: CLEAR_SESSION, domain: AuthDomain});

export function LogoutDispatchBindings(dispatch) {
  return {
    clearSession: () => {
      dispatch(clearAuth());
      dispatch(push('/admin/login'));
    }
  }
}
