import React, {Component} from 'react';
import {connect} from 'react-redux';
import {OffersStateToPropsBinding, OffersDispatchToPropsBinding} from "./Offers.bindings";
import CarDetail from './components/CarDetail.component'
import OffersList from './components/OffersList.component'

@connect(OffersStateToPropsBinding, OffersDispatchToPropsBinding)
export default class Offers extends Component {

  componentWillMount() {
    this.props.fetchOffers(this.props.token, this.props.routeParams.offerId)
  }

  render() {
    return (
      <div id="list_offers">
        <CarDetail appliance={this.props.appliance}/>
        <br/>
        <OffersList pvp={this.props.appliance.totalPrice} offers={this.props.offers}/>
        <div className="condition-details">
          <div className="text header"> Offer details </div>
          <div className="text detail">This offer is valid between 1st July 2016 and 30th September 2016. Subject to change due to manufacturer or dealer price changes.</div>
        </div>
      </div>
    )
  }
}
