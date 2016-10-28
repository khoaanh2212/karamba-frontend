import React, {Component} from "react";
import FormatCurrency from "shared/utils/FormatCurrency";

let priceInformation = (label, price, diff, perc) => (
  <div className="price-information">
    <h3>{label}</h3>
    <h2 className="price">{FormatCurrency(price)}</h2>
    <div>
      <span className="discount">{FormatCurrency(diff)} descuento</span>
      <span className="perc">{perc}% de ahorro</span>
    </div>
  </div>
);

const diffPriceFromPvp = (pvp, price) => Math.round((pvp - price) * 100) / 100;
const percPriceFromPvp = (pvp, price) => Math.round(((pvp - price) / pvp * 100) * 100) / 100;

export default class DetailFooterOffer extends Component {
  render() {
    const offer = this.props.offer.offer;
    const pvp = this.props.offer.appliance.price;

    const diffFromPrice = diffPriceFromPvp.bind(null, pvp);
    const percFromPrice = percPriceFromPvp.bind(null, pvp);

    return (
      <div className="footer-offer">
        <div className="grid">
          <div
            className="col-1-2">{priceInformation('Al contado', offer.cashPrice, diffFromPrice(offer.cashPrice), percFromPrice(offer.cashPrice))}</div>
          <div
            className="col-1-2">{priceInformation('Financiado', offer.foundedPrice, diffFromPrice(offer.foundedPrice), percFromPrice(offer.foundedPrice))}</div>
        </div>
      </div>
    )
  }
}
