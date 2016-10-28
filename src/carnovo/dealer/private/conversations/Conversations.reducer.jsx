import reducerFactory from 'shared/utils/ReducerFactory';
import {map} from 'lodash';
export const NEW_MESSAGE = "new_message";
export const FETCH_CONVERSATIONS_SUCCESS = 'FETCH_CONVERSATIONS_SUCCESS';
export const FETCH_CONVERSATIONS_ERROR = 'FETCH_CONVERSATIONS_ERROR';
export const FETCH_CONVERSATION_LIST_OF_CLIENT_SUCCESS = 'FETCH_CONVERSATION_LIST_OF_CLIENT_SUCCESS';
export const FETCH_CONVERSATION_LIST_OF_CLIENT_ERROR = 'FETCH_CONVERSATION_LIST_OF_CLIENT_ERROR';
export const ConversationsDomain = 'ConversationsDomain';
export const initialState = {
    loading: true,
    error: null,
    conversations: {},
    conversationsClient: []
};

let handleConversations = (conversations) => {
  conversations.map((conversation) => {
    let summaryExtraPrice = calculateSumPriceExtras(conversation.extras);
    if (conversation.package) {
      summaryExtraPrice += conversation.package.price;
    }
    conversation.summaryExtraPrice = summaryExtraPrice;
  });
  return conversations;
};

let calculateSumPriceExtras = (extras) => {
  let summaryPrice = 0;
  map(extras, (extra, index) => {
    if (!isNaN(extra.price))
      summaryPrice += extra.price;
  });
  return summaryPrice;
};

let cases = (state, action) => {
    switch (action.type) {
        case FETCH_CONVERSATIONS_SUCCESS:
            return {...state, error: null, loading: false, conversations: handleConversations(action.conversations)};
        case FETCH_CONVERSATIONS_ERROR:
            return {...state, error: action.error, loading: false, conversations: {}};
        case FETCH_CONVERSATION_LIST_OF_CLIENT_SUCCESS:
            return {...state, error: null, loading: false, conversationsClient: handleConversations(action.conversations)};
        case FETCH_CONVERSATION_LIST_OF_CLIENT_ERROR:
            return {...state, error: action.error, loading: false, conversationsClient: []};
    }
};

export default reducerFactory(initialState, ConversationsDomain, cases)
