import React, {Component} from 'react'

export default class SectionThird extends Component {
  render() {
    return (
      <section className="section-second container-fluid">
        <div className="col-sm-4">
          <div className="text-center icons margin-icon"><img src={require("../../theme/img/icon-choose.svg")}/></div>
          <h2 className="text-center">1. SELECCIONA TU COCHE</h2>
          <p className="text-center">Utiliza nuestro configurador y guías de compra para encontrar tu coche perfecto.</p>
        </div>

        <div className="col-sm-4">
          <div className="text-center icons"><img src={require("../../theme/img/icon-get-offers.svg")}/></div>
          <h2 className="text-center">2. RECIBE OFERTAS</h2>
          <p className="text-center">En solo 24 horas te encontraremos las mejores ofertas de concesionarios oficiales a nivel local y nacional. </p>
        </div>

        <div className="col-sm-4">
          <div className="text-center icons"><img src={require("../../theme/img/icon-buy-car.svg")}/></div>
          <h2 className="text-center">3. COMPRA TU COCHE</h2>
          <p className="text-center">Reliza tu compra directamente del concesionario al precio ofertado. ¡No te cobraremos nada!</p>
        </div>
      </section>
    )
  }
}
