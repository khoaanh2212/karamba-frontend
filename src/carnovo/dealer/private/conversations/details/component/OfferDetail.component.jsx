import React, {Component} from 'react';
import ColorMap from '../../../../../shared/utils/ColorMap';
import FormatCurrency from '../../../../../shared/utils/FormatCurrency';

export default class OfferDetail extends Component {
  constructor() {
    super();
    this.state = {
      showExtra: false
    }
  }

  toggleExtras() {
    this.setState({showExtra: !this.state.showExtra})
  }

  render() {
    let totalExtrasPrice = (each)=> { let total=0; each.map((ex, i)=>total += ex.price); return total};
    let appliance = this.props.appliance || {color: {}, vehicle: {}, extras: []};
    let carColor = ColorMap(appliance.color && appliance.color.optionName);
    let pvp = 300000;
    let cashPrice = 11;
    let foundedPrice = 12;
    let payments = [
      {
        type: "Al contado",
        total: cashPrice + " €",
        desc: Math.round((pvp - cashPrice) * 100) / 100  + " € inferior al PVP",
        discount: Math.round(((pvp - cashPrice) / pvp * 100) * 100) / 100 + "% de ahorro"
      },
      {
        type: "Financiado",
        total: foundedPrice + " €",
        desc: Math.round((pvp - foundedPrice) * 100) / 100  + " € inferior al PVP",
        discount: Math.round(((pvp - foundedPrice) / pvp * 100) * 100) / 100 + "% de ahorro"
      }];

    return(
      <div className="detail-wrapper">
        <div className="row border-btm">
          <div className="col-md-8">
            <div className="model">{appliance.vehicle.modelNameToDisplay}</div>
            <div className="brand">{appliance.vehicle.makeNameToDisplay}</div>
          </div>
          <div className="col-md-4">
            <div className="color" style={{background: carColor}}></div>
          </div>
        </div>
        <div className="border-btm">
          <div className="row">
            <div className="col-md-8 pack">{'package'}</div>
            <div className="col-md-4">{FormatCurrency(1234)}</div>
          </div>

          {appliance.extras.length > 0 ?
            <div className="row extra-price" onClick={e=>::this.toggleExtras()}>
              <div className="col-md-8">Extras <i className={"ic-caret-" + (this.state.showExtra ? "up" : "down")}/></div>
              <div className="col-md-4">{FormatCurrency(totalExtrasPrice(appliance.extras))}</div>
            </div> : null}

          {this.state.showExtra && appliance.extras.map((extra, i)=>
            <div key={i} className="row">
              <div className="col-md-8">{extra.optionName}</div>
              <div className="col-md-4">{extra.displayPrice}</div>
            </div>
          )}
        </div>
        <div className="row border-btm">
          <div className="col-md-8"> Precio recomendado </div>
          <div className="col-md-4"> {FormatCurrency(appliance.price)}</div>
        </div>
        <div className="row border-btm no-padding-topbottom">
          {payments.map((payment, i) =>
            <div key={i} className={"col-md-6" + (i == 0 ? " first-col" : "")}>
              <div className="cash">
                <div className="title">{payment.type}</div>
                <div className="price">{payment.total}</div>
                <div className="desc">{payment.desc}</div>
                <div className="desc">{payment.discount}</div>
              </div>
            </div>
          )}
        </div>
        <div className="row actions">
          <div className="col-md-6 first-col"><i className="ic-flag"/> Reporta usuario</div>
          <div className="col-md-6"><i className="ic-close"/>Retirar oferta</div>
        </div>
      </div>
    )
  }
}
