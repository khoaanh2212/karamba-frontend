import {login} from '../../../services/authService';

export function LoginPropsBindings(state) {
    return {
        auth: state.auth
    }
}

export function LoginDispatchBindings(dispatch) {
    return {
        onSubmit: (username, password) => {
            login(username, password)
                .then(dispatch);
        }
    }
}