import {ErrorsDomain} from "../../../reducers/errorsReducer";

export function AppPropsBindings(state, ownProps) {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export function AppDispatchBindings(dispatch, ownProps) {
    return {
        resetErrors: () => dispatch({type: 'RESET_ERRORS', domain: ErrorsDomain, run: (state, action) => ([])})
    }
}