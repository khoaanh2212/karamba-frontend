import React, {Component} from 'react';

export default class DetailsPrice extends React.Component {

  render() {
   let price = this.props.price;
    return(
      <div>
        <div className="grid option bold">
          <div className="col-2-3">PVP</div>
          <div className="col-1-3 price">{price.pvp.toLocaleString('es-ES')} €</div>
        </div>
        <div className="grid option bold">
          <div className="col-2-3">Precio</div>
          <div className="col-1-3 price">{price.cash.toLocaleString('es-ES')} €</div>
        </div>
        <div className="grid option bold">
          <div className="col-2-3">Descuento</div>
          <div className="col-1-3 price">{price.discount.toLocaleString('es-ES')} %</div>
        </div>
      </div>
    )
  }
}
