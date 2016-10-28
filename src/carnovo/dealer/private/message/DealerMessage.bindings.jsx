import {fetchDealerMessage, sendDealerMessage} from 'services/DealerMessage.service';
import {fetchOpportunity} from 'services/Opportunity.service';

export const DealerMessageStateToPropsBinding = (state) => {
  return {
    token: state.auth.token,
    messages: state.dealerMessage.messages,
    chatWith: state.dealerMessage.chatWith,
    offer: state.opportunities.selectedOpportunity
  };
};

export const DealerMessageDispatchToPropsBinding = (dispatch, ownProps) => ({
  fetchOpportunity: (offerId) => fetchOpportunity(ownProps.token, offerId).then(dispatch),
  sendDealerMessage: (token, offerId, message) => sendDealerMessage(token, offerId, message).then(dispatch)
});
