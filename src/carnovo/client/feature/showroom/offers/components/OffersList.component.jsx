import React, {Component} from 'react';
import {browserHistory} from 'react-router'
import RatingStars from '../../../../../shared/components/RatingStars.component'
import FormatCurrency from '../../../../../shared/utils/FormatCurrency'
import {GeneralConditionMap} from '../../../../../shared/utils/GeneralConditionMap';
import PopupCall from '../../../../../client/feature/showroom/components/PopupCall.component';
import PopupMessage from '../../../../../client/feature/showroom/components/PopupMessage.component';

let mapBadges = (badge) => {
    switch (badge) {
        case "price":
            return {
                klass: "best-price",
                label: "Mejor precio"
            };
        case "nearby":
            return {
                klass: "nearby",
                label: "Más cercano"
            };
        case "rate":
            return {
                klass: "best-rate",
                label: "Mejor valorado"
            };
        default:
            return {
                klass: badge,
                label: ""
            };
    }
};

let calcRates = (rates) => {
  let rated = 0;
  let sum = 0;
  let isFloat = (n)=> Number(n) === n && n % 1 !== 0;
  if (rates.comments && Array.isArray(rates.comments.data)) {
    let data = rates.comments.data;
    rated = data.length;
    data.map((datum,i)=> {
      if (isFloat(datum.rating)) sum += datum.rating;
    })
  }

  return {total: rated, avg: rated > 0 ? sum/rated : 0}
};

let Item = (data) => {
    let {
        dealerInfo,
        id,
        inStock,
        address,
        phoneNumber,
        cashPrice,
        foundedPrice,
        pvp,
        isBestPrice,
        isClosest,
        isHighestRating,
        distance,
        ratings
    } = data;
    let ratingInfo = calcRates(ratings);

    let payments = [
        {
            type: "Al contado",
            total: FormatCurrency(cashPrice),
            desc: FormatCurrency(Math.round((pvp - cashPrice) * 100) / 100) + " inferior al PVP",
            discount: Math.round(((pvp - cashPrice) / pvp * 100) * 100) / 100 + "% de ahorro"
        },
        {
            type: "Financiado",
            total: FormatCurrency(foundedPrice),
            desc: FormatCurrency(Math.round((pvp - foundedPrice) * 100) / 100) + " inferior al PVP",
            discount: Math.round(((pvp - foundedPrice) / pvp * 100) * 100) / 100 + "% de ahorro"
        }];

    let toActions = (action) => {
        switch (action.type) {
            case "call":
                data.showPopupCall();
                break;
            case "message":
                browserHistory.push(process.env.PUBLIC_PATH + 'client/' + action.type + '/' + id);
                break;
            case "dealer":
                browserHistory.push(process.env.PUBLIC_PATH + 'client/offer/' + id + '/dealer/');
                break;
            case "detail":
                browserHistory.push(process.env.PUBLIC_PATH + 'client/offer/' + id + '/dealer/');
                break;
            default:
                break;
        }
    };

    return (
        <div className="item">
            <div className="details">
                <div className="col-md-6">
                    <div className="avatar-frame img-circle" onClick={(e) => toActions({type:"dealer"})} style={{backgroundImage: "url('" + (dealerInfo.avatar ? dealerInfo.avatar.url : "") + "')"}}></div>
                    <div className="brief">
                        <div className="name">
                            {dealerInfo.vendorName}
                        </div>
                        <div className="addr">
                            {address}
                        </div>
                        <div className="distance color-blue"><i className="ic-location"/> A {distance} Km</div>
                        <div className="rating color-blue">
                            <RatingStars rating={ratingInfo.avg} readOnly={true}
                                         style={{width: "auto", float: "left", marginRight: "5px"}}/> {ratingInfo.total} valoraciones
                        </div>
                    </div>
                    <div className="badges">
                        {isBestPrice ? <div className={"badge " + mapBadges("price").klass}>
                            <span> {mapBadges("price").label} </span></div> : ""}
                        {isClosest ? <div className={"badge " + mapBadges("nearby").klass}>
                            <span> {mapBadges("nearby").label} </span></div> : ""}
                        {isHighestRating ? <div className={"badge " + mapBadges("rate").klass}>
                            <span> {mapBadges("rate").label} </span></div> : ""}
                    </div>
                </div>
                <div className="col-md-6">
                    {payments.map((payment, i) =>
                        <div key={i} className="col-sm-6">
                            <div className="finances">
                                <div> {payment.type} </div>
                                <div className="color-green"> {payment.total} </div>
                                <div className="font-weight-light"> {payment.desc} </div>
                                <div className="font-weight-light"> {payment.discount} </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="more-info">
                {dealerInfo.generalConditions.map((condition, i)=>
                    <div key={i} className="each"><i className="ic-check-success"/><span>{GeneralConditionMap(condition.text)}</span></div>
                )}
                {inStock ?
                    <div className="each"><i className="ic-check-success"/><span className="color-blue">Coches similares en stock</span>
                    </div> : null}
            </div>
            <div className="btn-wrapper">
                <button className="btn call" onClick={(e) => toActions({type:"call", phoneNumber: phoneNumber})}> Llamar
                    <i className="ic-phone"/></button>
                <button className="btn message" onClick={(e) => toActions({type:"message"})}> Enviar mensaje <i
                    className="ic-email"/></button>
                <button className="btn to-detail" onClick={(e) => toActions({type:"detail"})}> Ver detalles</button>
            </div>

        </div>
    )
};

export default class OffersList extends Component {
    constructor() {
        super();
        this.state = {
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

    render() {
        /*
         * spec:
         * I want to always have the best ones in the following order:
         * 1. best price,
         * 2. highest dealer rating,
         * 3. closest location
         * so that the ordering matches my priorities
         * */
        let offersLen = this.props.offers.length;

        return (

            <div className="offers-list">
                <div className="header-text"> {offersLen} Ofertas</div>
                <div className="items">
                    {this.props.offers.map((offer, i)=>
                        <Item key={i} pvp={this.props.pvp} {...offer} showPopupCall={::this.showPopupCall} />)
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
