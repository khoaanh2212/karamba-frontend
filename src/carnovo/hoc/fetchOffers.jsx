import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOffers} from 'services/Offers.service';
import ErrorBox from 'shared/components/ErrorBox.component';

export default function fetchClientsOffers(Component) {
  let mapStateToProps = (state) => ({
    token: state.auth.token,
    appliance: state.appliance,
    offers: state.offers
  });

  let DispatchToPropsBinding = (dispatch, ownProps) => ({
    getOffers: (token, id) => fetchOffers(token, id).then(dispatch)
  });

  @connect(mapStateToProps, DispatchToPropsBinding)
  class FetchOffers extends React.Component {
    componentDidMount() {
      if(!this.props.offers.loaded) this.props.getOffers(this.props.token, this.props.routeParams.offerId);
    }

    render() {
      if (this.props.offers.loading === true) {
        return <div>Loading...</div>
      } else if (this.props.offers.error) {
        return <ErrorBox message={this.props.offers.error}/>
      } else {
        return <Component {...this.props} offers={this.props.offers} appliance={this.props.appliance}/>
      }
    }
  }

  return FetchOffers;
}
