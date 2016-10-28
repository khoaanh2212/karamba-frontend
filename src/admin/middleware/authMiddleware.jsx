import {push} from 'react-router-redux';

export default store => next => action => {
    if(action.domain !== 'auth') return next(action);

    let nextAction = next(action);
    
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            store.dispatch(push('/admin/panel'));
            break;
        case 'AUTHORIZATION_ERROR':
            store.dispatch(push('/admin/login'));
            break;
    }

    return nextAction;
}