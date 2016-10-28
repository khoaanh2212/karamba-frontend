import {fetchClientMessage, sendClientMessage} from 'services/ClientMessage.service';

export const ClientMessageStateToPropsBinding = (state , props) => {
  return {
    token: state.auth.token,
    messages: state.clientMessage.messages,
    chatWith: state.clientMessage.chatWith,
    offerId: props.params.offerId
  };
};

export const ClientMessageDispatchToPropsBinding = (dispatch, ownProps) => ({
  fetchClientMessage: (token, dealerId) => fetchClientMessage(token, dealerId).then(dispatch),
  sendClientMessage: (token, offerId, message, upload) => sendClientMessage(token, offerId, message, upload).then(dispatch)
});
