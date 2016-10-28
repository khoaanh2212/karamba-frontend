import {fetchOpportunities,fetchOpportunitiesArchived} from 'services/Opportunity.service';
import { orderBy, filter, forEach } from 'lodash';

export const OpportunitiesStateToProps = (state, ownProps) => {
  return {
    token: state.auth.token,
    opportunities: state.opportunities,
    orderedOpportunities: (sort, status, inputs, rangePicker) => {
      let opportunities = state.opportunities.opportunities;
      forEach(inputs, function (value, key) {
        if (value == '') return;
        opportunities = filter(opportunities, (o) => {
          return (o[key].toLowerCase().indexOf(value.toLowerCase()) > -1)
        });
      });
      //filter with date
        if (rangePicker.endDate) {
            let startDate = new Date(rangePicker.startDate._d);
            startDate.setHours(0, 0, 0, 0);
            let endDate = new Date(rangePicker.endDate._d);
            endDate.setHours(23, 59, 59, 999);
            let filterOpp = [];
            opportunities.map((opp, i) => {
                let oppDate = new Date(opp.created);
                if(oppDate >= startDate && oppDate <= endDate){
                    filterOpp.push(opp);
                }
            });
            opportunities = filterOpp;
        }
      if (!!status) {
        opportunities = filter(opportunities, (o) => {
          if (status == 'others') {
            return o.state != 'new_opportunity' && o.state != 'lost'
          }
          return o.state == status
        });
      }

      if (sort.field !== '') {
        return orderBy(opportunities, sort.identity, sort.order ? 'asc' : 'desc');
      }

      return orderBy(opportunities, 'isNew', 'desc');
    }
  }
};

export const OpportunitiesDispatchToPropsBinding = (dispatch, ownProps) => ({
  toast: notification => dispatch(notification),
  fetchOpportunities: (token) => {
    fetchOpportunities(token).then(dispatch)
  },
  fetchOpportunitiesArchived: (token) => {
    fetchOpportunitiesArchived(token).then(dispatch)
  }
});
