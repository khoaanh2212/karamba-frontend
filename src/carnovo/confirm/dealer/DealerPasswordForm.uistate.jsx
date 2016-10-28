export const DealerConfirmKey = 'dealer-home';
export const FETCH_DEALER_CONF_SUCCESS = 'FETCH_DEALER_CONF_SUCCESS';
export const FETCH_DEALER_CONF_ERROR = 'FETCH_DEALER_CONF_ERROR';

export const DealerConfirmState = {
    error: null
};

export function DealerConfirmUiReducer(state = DealerConfirmState,action) {
    switch(action.type) {
        case FETCH_DEALER_CONF_SUCCESS:
            return state.merge({'error': null});
            break;
        case FETCH_DEALER_CONF_ERROR:
            return state.merge({'error': action.error});
            break;
        default:
            return state;
    }
}

export default {
    key: DealerConfirmKey,
    state: DealerConfirmState,
    reducer: DealerConfirmUiReducer
}