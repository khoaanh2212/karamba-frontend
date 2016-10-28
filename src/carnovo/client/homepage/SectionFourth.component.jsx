import React, {Component} from 'react'

export default class SectionFourth extends Component {
  render() {
    return (
      <section className="section-fourth container-fluid">
        <div className="container section-fourth-inner">
          <div className="item col-sm-6 col-md-3">
            <div className="pic"><img src={require("../../theme/img/icon-coin.svg")}/></div>
            <div className="info">
              <h1>1.600€</h1>
              <p>de ahorro medio</p>
            </div>
          </div>

          <div className="item col-sm-6 col-md-3">
            <div className="pic"><img src={require("../../theme/img/icon-car.svg")}/></div>
            <div className="info">
              <h1>+10MM</h1>
              <p>de configuraciones posibles</p>
            </div>
          </div>

          <div className="item col-sm-6 col-md-3">
            <div className="pic"><img src={require("../../theme/img/icon-star.svg")}/></div>
            <div className="info">
              <h1>4.8/5</h1>
              <p>valoración media de nuestros oncesionarios </p>
            </div>
          </div>

          <div className="item col-sm-6 col-md-3">
            <div className="pic"><img src={require("../../theme/img/icon-lock.svg")}/></div>
            <div className="info">
              <h1>Cero</h1>
              <p>detalles personales compartidos</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
