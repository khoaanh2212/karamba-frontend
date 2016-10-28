export const DealerHomeUiKey = 'dealer-home';

export const PENDING_DEALER_REGISTER_SUCCESS = 'PENDING_DEALER_REGISTER_SUCCESS';
export const PENDING_DEALER_REGISTER_FAILURE = 'PENDING_DEALER_REGISTER_FAILURE';

export const DealerHomeUiInitialState = {
    registered: false,
    error: null
};

export function DealerHomeUiReducer(state = DealerHomeUiInitialState,action) {
    switch(action.type) {
        case PENDING_DEALER_REGISTER_SUCCESS:
            return state.merge({'error': null, 'registered': true});
            break;
        case PENDING_DEALER_REGISTER_FAILURE:
            return state.merge({'error': action.error, 'registered': false});
            break;
        default:
            return state;
    }
}

export default {
    key: DealerHomeUiKey,
    state: DealerHomeUiInitialState,
    reducer: DealerHomeUiReducer
}