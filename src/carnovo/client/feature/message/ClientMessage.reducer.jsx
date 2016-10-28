import reducerFactory from 'shared/utils/ReducerFactory';

export const FETCH_CLIENTMESSAGE_SUCCESS = 'FETCH_CLIENTMESSAGE_SUCCESS';
export const FETCH_CLIENTMESSAGE_ERROR = 'FETCH_CLIENTMESSAGE_ERROR';
export const SEND_CLIENTMESSAGE_SUCCESS = 'SEND_CLIENTMESSAGE_SUCCESS';
export const SEND_CLIENTMESSAGE_ERROR = 'SEND_CLIENTMESSAGE_ERROR';


export const ClientMessageDomain = 'ClientMessageDomain';
export const initialState = {
  loading: true,
  error: null,
  messages: [],
  chatWith: ""
};


let cases = (state, action) => {
  switch (action.type) {
    case FETCH_CLIENTMESSAGE_SUCCESS:
      return {...state, error: null, loading: false, messages: action.messages.messages, chatWith: action.messages.chatWith};
    case FETCH_CLIENTMESSAGE_ERROR:
      return {...state, error: action.error, loading: false, messages: {}, chatWith: ""};
    case SEND_CLIENTMESSAGE_SUCCESS:
      return {...state, error: null};
    case SEND_CLIENTMESSAGE_ERROR:
      return {...state, error: action.error};
  }
};

export default reducerFactory(initialState, ClientMessageDomain, cases);
