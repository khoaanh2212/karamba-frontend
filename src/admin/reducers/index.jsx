import authReducer from 'reducers/authReducer';
import pendingDealersReducer from 'reducers/pendingDealersReducer';
import errorsReducer from 'reducers/errorsReducer';
import { combineReducers }  from 'redux';
import { routerReducer }  from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    auth: authReducer,
    errors: errorsReducer,
    pendingDealers: pendingDealersReducer
});