import {push} from 'react-router-redux';
import {FETCH_DEALER_CONF_SUCCESS} from "confirm/dealer/DealerPasswordForm.uistate.jsx";

export default store => next => action => {
    let nextAction = next(action);

    switch (action.type) {
        case FETCH_DEALER_CONF_SUCCESS:
            store.dispatch(push('/dealer/login'));
            break;
    }

    return nextAction;
}
