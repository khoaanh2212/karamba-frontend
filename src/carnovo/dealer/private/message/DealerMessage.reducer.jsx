import reducerFactory from 'shared/utils/ReducerFactory';

export const FETCH_DEALER_MESSAGE_SUCCESS = 'FETCH_DEALER_MESSAGE_SUCCESS';
export const FETCH_DEALER_MESSAGE_ERROR = 'FETCH_DEALER_MESSAGE_ERROR';
export const SEND_DEALER_MESSAGE_SUCCESS = 'SEND_DEALER_MESSAGE_SUCCESS';
export const SEND_DEALER_MESSAGE_ERROR = 'SEND_DEALER_MESSAGE_ERROR';


export const DealerMessageDomain = 'DealerMessageDomain';
export const initialState = {
    loading: true,
    error: null,
    messages: [],
    chatWith: ""
};


let cases = (state, action) => {
    switch (action.type) {
        case FETCH_DEALER_MESSAGE_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                messages: action.messages.messages,
                chatWith: action.messages.chatWith
            };
        case FETCH_DEALER_MESSAGE_ERROR:
            return {...state, error: action.error, loading: false, messages: [], chatWith: ""};
        case SEND_DEALER_MESSAGE_SUCCESS:
            return {...state, error: null};
        case SEND_DEALER_MESSAGE_ERROR:
            return {...state, error: action.error};
    }
};

export default reducerFactory(initialState, DealerMessageDomain, cases);
