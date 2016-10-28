import reducerFactory from "utils/reducerFactory";

export const PendingDealersDomain = 'pendingDealers';
export const initialState = {
    isFetching: false,
    errorMessage: null,
    pendingDealers: []
};

export let addPendingDealers = (prevState, newPendingDealers) => ({
    ...prevState,
    isFetching: false,
    errorMessage: null,
    pendingDealers: prevState.pendingDealers.concat(newPendingDealers)
});

export let removeDealer = (prevState, dealerId) => ({
    ...prevState,
    errorMessage: null,
    pendingDealers: prevState.pendingDealers.filter((dealer)=> dealer.id !== dealerId)
});

export let showError = (prevState, message) => ({
    ...prevState,
    errorMessage: message
});

export let findDealer = (state, dealerId) => {
  return state.pendingDealers.filter((dealer)=> dealer.id === dealerId)[0];
};

let pendingDealersReducer = reducerFactory(initialState, PendingDealersDomain, switchReducer);

function switchReducer(state, action) {
    switch(action.type) {
        case 'ACCEPT_DEALER_SUCCESS':
            return removeDealer(state, action.dealerId);
            break;
        case 'ACCEPT_DEALER_ERROR':
            return showError(state, "Error aceptando al vendedor:" + findDealer(state, action.dealerId).dealerName);
            break;
        case 'REJECT_DEALER_SUCCESS':
            return removeDealer(state, action.dealerId);
            break;
        case 'REJECT_DEALER_ERROR':
            return showError(state, "Error rechazando al vendedor:" + findDealer(state, action.dealerId).dealerName);
            break;
        case 'FETCH_PENDING_DEALERS_SUCCESS':
            return addPendingDealers(state, action.pendingDealers);
            break;
    }
}

export default pendingDealersReducer;
