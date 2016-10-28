import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {map} from 'lodash';
import DealerContact from './components/DealerContact.component';
import OfferDetails from './components/OfferDetails.component';
import ReviewDetail from './components/ReviewDetail.component';
import DealerProfileAvatar from '../../../../../widgets/DealerProfileAvatar.component';
import {DealerOfferDetailToPropsBinding, DealerOfferDetailDispatchToPropsBinding} from "./DealerOfferDetail.bindings";
import MessageBoxDialogComponent from '../../../../../shared/components/MessageDialogComponent';
import PopupCall from '../../../../../client/feature/showroom/components/PopupCall.component';
import PopupMessage from '../../../../../client/feature/showroom/components/PopupMessage.component';

@connect(DealerOfferDetailToPropsBinding, DealerOfferDetailDispatchToPropsBinding)
export default class DealerOfferDetail extends Component {
  constructor() {
    super();
    this.state = {
      tabActive: 'offer',
      showPopup: false,
      popupCall: false,
      popupMessage: false
    };
  }

  showPopupCall() {
    this.setState({
      showPopup: true,
      popupCall: true
    });
  }

  showPopupMessage() {
    this.setState({
      popupCall: false,
      popupMessage: true
    });
  }

  hidePopup() {
    this.setState({
      showPopup: false,
      popupCall: false,
      popupMessage: false
    });
  }

  componentWillMount() {
    this.props.fetchDealerOfferDetails(this.props.token, this.props.routeParams.offerId)
  }

  goBack() {
    browserHistory.goBack();
  }

  onLoadMore() {
    this.props.loadmoreReviewList()
  }

  render() {
    let {
      profile,
      offers,
      reviews,
      role,
      hasMore,
      messages
    } = this.props;

    return (
      <div id="show-room" className="dealer-offer-detail">
          <DealerContact profile={profile} offerId={this.props.routeParams.offerId} showPopupCall={::this.showPopupCall}></DealerContact>
          <DealerProfileAvatar profile={profile} action={{name:'Volver atrás', go: this.goBack}}></DealerProfileAvatar>
          <div className="clearfix"></div>
          <div className="body">
            <div className="tab container-fluid no-padding under-line">
              <ul className="list-inline text-center">
                {this.state.tabActive === 'message' ?
                  <li className="active">&nbsp;Mensajes</li> :
                  <li onClick={()=>this.setState({tabActive:'message'})}>&nbsp;Mensajes</li>}
                {this.state.tabActive === 'offer' ?
                  <li className="active">&nbsp;Tus ofertas</li> :
                  <li onClick={()=>this.setState({tabActive:'offer'})}>&nbsp;Tus ofertas</li>}
                {this.state.tabActive === 'review' ?
                  <li className="active">&nbsp;Valoraciones</li> :
                  <li onClick={()=>this.setState({tabActive:'review'})}>&nbsp;Valoraciones</li>}
              </ul>
            </div>
            {this.state.tabActive === 'offer' ? <div className="main-body padding">
              <div className="title">
                <div className="head">Tienes 1 oferta de {profile.vendorName}</div>
                <br/>
                <div className="sub-head">These offers are On the Road Prices, based on a brand new factory order vehicle, built to this specification.</div>
                <div className="sub-head">Want very quick delivery? Get in touch with Jo to find out what similar cars are in stock.</div>
              </div>
            </div> : ""}
            {
              this.state.tabActive === 'message' ?
                  <div className="message-component">
                    <div className="carnovo-row">
                      <div className="message-container">
                        {
                          messages.map((message, i) =><MessageBoxDialogComponent key={i} data={message}/>)
                        }
                      </div>
                    </div>
                  </div>
                 :
              this.state.tabActive === 'offer' ?
                <div className="main-body padding">
                  {
                    map(offers, (offer, i) => {
                      return <OfferDetails key={i} offer={offer} conditions={profile.generalConditions}/>
                    })
                  }
                </div> :
                <div className="main-body padding">
                  <ReviewDetail role={role} hasMore={hasMore} reviews={reviews} onLoadMore={::this.onLoadMore}/>
                </div>
            }
          </div>
          {this.state.showPopup ? <div className="fade" onClick={::this.hidePopup}></div> : ""}
          {this.state.popupCall && this.state.showPopup ?
              <PopupCall hidePopupCall={::this.hidePopup} showPopupMessage={::this.showPopupMessage}/> : ""}
          {this.state.popupMessage && this.state.showPopup ?
              <PopupMessage hidePopupMessage={::this.hidePopup}/> : ""}
      </div>
      )
  }
}
