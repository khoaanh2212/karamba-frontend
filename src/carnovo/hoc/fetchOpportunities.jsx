import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOpportunities} from 'services/Opportunity.service';
import ErrorBox from 'shared/components/ErrorBox.component';

export default function fetchDealerOpportunities(Component) {
  let mapStateToProps = (state) => ({
    token: state.auth.token,
    opportunities: state.opportunities
  });

  let DispatchToPropsBinding = (dispatch, ownProps) => ({
    getOpportunities: token => fetchOpportunities(token).then(dispatch)
  });

  @connect(mapStateToProps, DispatchToPropsBinding)
  class FetchOpportunities extends React.Component {
    componentDidMount() {
      if(!this.props.opportunities.loaded) this.props.getOpportunities(this.props.token);
    }

    render() {
      if (this.props.opportunities.loading === true) {
        return <div>Loading...</div>
      } else if (this.props.opportunities.error) {
        return <ErrorBox message={this.props.opportunities.error}/>
      } else {
        return <Component {...this.props} opportunities={this.props.opportunities} />
      }
    }
  }

  return FetchOpportunities;
}
