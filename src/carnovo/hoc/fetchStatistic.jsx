import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStatistic} from 'services/Statistic.service';
import ErrorBox from 'shared/components/ErrorBox.component';

export default function fetchDealerStatistic(Component) {
  let mapStateToProps = (state) => ({
    token: state.auth.token,
    statistic: state.statistic
  });

  let DispatchToPropsBinding = (dispatch, ownProps) => ({
    getStatistic: token => fetchStatistic(token).then(dispatch)
  });

  @connect(mapStateToProps, DispatchToPropsBinding)
  class FetchStatistic extends React.Component {
    componentDidMount() {
      if(!this.props.statistic.loaded) this.props.getStatistic(this.props.token);
    }

    render() {
      if (this.props.statistic.loading === true) {
        return <div>Loading...</div>
      } else if (this.props.statistic.error) {
        return <ErrorBox message={this.props.statistic.error}/>
      } else {
        return <Component {...this.props} statistic={this.props.statistic} />
      }
    }
  }

  return FetchStatistic;
}
