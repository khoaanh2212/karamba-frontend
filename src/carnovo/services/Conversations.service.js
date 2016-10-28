import 'whatwg-fetch';
import config from 'config';
import {checkStatus, getOptions} from './Utils';

import {
  ConversationsDomain,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_ERROR,
  FETCH_CONVERSATION_LIST_OF_CLIENT_SUCCESS,
  FETCH_CONVERSATION_LIST_OF_CLIENT_ERROR
} from "dealer/private/conversations/Conversations.reducer";

function fetchConversationsSuccess(response) {
  return {
    type: FETCH_CONVERSATIONS_SUCCESS,
    domain: ConversationsDomain,
    conversations: response.data
  };
}

function fetchConversationsError(error) {
  return {
    type: FETCH_CONVERSATIONS_ERROR,
    domain: ConversationsDomain,
    error: error
  };
}

function fetchConversationListOfClientSuccess(response) {
  return {
    type: FETCH_CONVERSATION_LIST_OF_CLIENT_SUCCESS,
    domain: ConversationsDomain,
    conversations: response.data.conversationList
  };
}

function fetchConversationListOfClientError(error) {
  return {
    type: FETCH_CONVERSATION_LIST_OF_CLIENT_ERROR,
    domain: ConversationsDomain,
    error: error
  };
}

export function fetchConversations(token) {
  var url = `${config.api}/dealers/conversations`;

  return fetch(url, getOptions(token))
    .then(data => checkStatus(data, fetchConversationsSuccess, fetchConversationsError))

}

export function fetchConversationListOfClient(token) {
  var url = `${config.api}/client/conversation-list`;

  return fetch(url, getOptions(token))
      .then(data => checkStatus(data, fetchConversationListOfClientSuccess, fetchConversationListOfClientError))

}
