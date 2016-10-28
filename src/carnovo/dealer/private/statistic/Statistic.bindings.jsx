import {fetchStatistic} from 'services/Statistic.service';

export const StatisticStateToProps = (state, ownProps) => {
  return {
    token: state.auth.token,
    statistic: state.statistic,
  }
};

export const StatisticDispatchToPropsBinding = (dispatch, ownProps) => ({
  fetchStatistic: (token) => {
    fetchStatistic(token).then(dispatch)
  }
});
