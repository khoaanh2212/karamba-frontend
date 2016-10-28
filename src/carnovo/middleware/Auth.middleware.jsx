import {push} from 'react-router-redux';
import {AUTH_SUCCESS, CLEAR_SESSION} from 'auth/Login.reducer';
import {FETCH_DEALER_ERROR} from "dealer/private/edit/DealerEditForm.uistate";

export default store => next => action => {
    let nextAction = next(action);
    switch (action.type) {
        case FETCH_DEALER_ERROR:
            store.dispatch(push('/dealer/login'));
            break;
        case AUTH_SUCCESS:
            switch (action.role) {
                case 'dealer':
                    if (action.first_use) {
                        store.dispatch(push('/dealer/profile/edit'));
                    } else {
                        store.dispatch(push('/dealer/opportunities'));
                    }
                    break;
            }
            break;
        case CLEAR_SESSION:
            store.dispatch(push(process.env.PUBLIC_PATH));
            break;
    }
    return nextAction;
}
