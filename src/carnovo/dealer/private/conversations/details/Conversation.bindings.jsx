import {fetchDealerMessage, sendDealerMessage} from 'services/DealerMessage.service';
import {fetchOpportunity} from 'services/Opportunity.service';

export const ConversationStateToPropsBinding = (state) => {
  return {
    token: state.auth.token,
    offer: state.opportunities.selectedOpportunity,
    messages: state.dealerMessage
  };
};

export const ConversationDispatchToPropsBinding = (dispatch, ownProps) => ({
  fetchMessage: (token) => fetchDealerMessage(token, ownProps.params.offerId).then(dispatch),
  fetchOpportunity: (token) => fetchOpportunity(token, ownProps.params.offerId).then(dispatch),
  sendDealerMessage: (token, offerId, message, upload) => sendDealerMessage(token, offerId, message, upload).then(dispatch)
});
