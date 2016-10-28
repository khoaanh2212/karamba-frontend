import {fetchConversations} from 'services/Conversations.service';
import {orderBy, filter, forEach} from 'lodash';

export const ConversationsStateToProps = (state, ownProps) => {
  return {
    token: state.auth.token,
    conversations: state.conversations,
    orderedConversations: (sort, flter, rangePicker) => {
      let conversations = state.conversations.conversations;
      forEach(flter, function (value, key) {
        if (value == '') return;
        conversations = filter(conversations, (o) => {
          return o[key].toLowerCase().indexOf(value.toLowerCase()) > -1
        });
      });
      //filter with date
      if (rangePicker.endDate) {
        let startDate = new Date(rangePicker.startDate._d);
        startDate.setHours(0, 0, 0, 0);
        let endDate = new Date(rangePicker.endDate._d);
        endDate.setHours(23, 59, 59, 999);
        let filterOpp = [];
        conversations.map((opp, i) => {
          let oppDate = new Date(opp.created);
          if(oppDate >= startDate && oppDate <= endDate){
            filterOpp.push(opp);
          }
        });
        conversations = filterOpp;
      }

      if (sort.field !== '') {
        return orderBy(conversations, sort.identity, sort.order ? 'asc' : 'desc');
      }

      return orderBy(conversations, 'isNew', 'desc');
    }
  }
};

export const ConversationsDispatchToPropsBinding = (dispatch, ownProps) => ({
  fetchConversations: (token) => {
    fetchConversations(token).then(dispatch)
  }
});
