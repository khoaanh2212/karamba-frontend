import React, {Component} from 'react';
import FormatCurrency from '../shared/utils/FormatCurrency';

const diffPriceFromPvp = (pvp, price) => Math.round((pvp - price) * 100) / 100;
const percPriceFromPvp = (pvp, price) => Math.round(((pvp - price) / pvp * 100) * 100) / 100;

let PriceComponent = ({pvp, price, name}) => {
  const diffFromPrice = diffPriceFromPvp.bind(null, pvp);
  const percFromPrice = percPriceFromPvp.bind(null, pvp);
  return (
    <div className="col-1-2">
      <div className="content left-content">
        <div className="price">
          <div className="title">{name}</div>
          <div className="value">{FormatCurrency(price)}</div>
          <div className="discount">{price && FormatCurrency(diffFromPrice(price))} descuento</div>
          <div className="discount">{price ? percFromPrice(price) : ""}% de ahorro</div>
        </div>
      </div>
    </div>
  )
};

export default class OfferPricePreview extends React.Component {
  render() {
    let {
      pvp,
      cashPrice,
      financePrice
    } = this.props;

    return (
      <div className="col-1-2 preview">
        <PriceComponent name="Al contado" pvp={pvp} price={cashPrice}/>
        <PriceComponent name="Financiado" pvp={pvp} price={financePrice}/>
      </div>
    )
  }
}
