import {fetchPendingDealers, acceptPendingDealer, rejectPendingDealer} from 'services/pendingDealersService';

export const PanelPropsBindings = (state, ownProps) => ({
    pendingDealers: state.pendingDealers,
    token: state.auth.token
});

export const PanelDispatchBindings = (dispatch, ownProps) => {
console.log(ownProps);
return{
    onAcceptPendingDealer: (id, token) => {acceptPendingDealer(id, token).then(dispatch);},
    onRejectPendingDealer: (id, token) => {rejectPendingDealer(id, token).then(dispatch);},
    fetchPendingDealers: (token) => {fetchPendingDealers(token).then(dispatch);}
}};