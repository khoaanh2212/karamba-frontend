import React, {Component} from 'react';

export default class OfferDetailsPrice extends React.Component {

  render() {
    let price = this.props.price;
    return(
      <div>
        <div className="grid option bold">
          <div className="col-2-3">Precio recomendado</div>
          <div className="col-1-3 price">{price.toLocaleString('es-ES')} €</div>
        </div>
      </div>
    )
  }
}

